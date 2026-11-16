import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validate } from '../src/middlewares/validate.js';
import {
  registerSchema,
  loginSchema,
  createPostSchema,
  createVideoLessonSchema,
  createCommentSchema,
  createStorySchema,
  createPurchaseSchema,
  createUserSchema
} from '../src/schemas/index.js';

describe('Zod Validation - Middlewares e Schemas do Backend', () => {
  describe('Middleware validate()', () => {
    it('deve chamar next() quando o body for válido', () => {
      let nextCalled = false;
      const req = { body: { email: 'teste@fioafio.com', password: 'secretpassword' } };
      const res = {};
      const next = () => { nextCalled = true; };

      const middleware = validate(loginSchema, 'body');
      middleware(req, res, next);

      assert.equal(nextCalled, true);
      assert.equal(req.body.email, 'teste@fioafio.com');
    });

    it('deve retornar status 400 com detalhes quando o body for inválido', () => {
      let statusSent = null;
      let jsonSent = null;
      let nextCalled = false;

      const req = { body: { email: '', password: '' } };
      const res = {
        status(code) {
          statusSent = code;
          return this;
        },
        json(data) {
          jsonSent = data;
          return this;
        }
      };
      const next = () => { nextCalled = true; };

      const middleware = validate(loginSchema, 'body');
      middleware(req, res, next);

      assert.equal(nextCalled, false);
      assert.equal(statusSent, 400);
      assert.equal(jsonSent.error, 'Erro de validação');
      assert.ok(Array.isArray(jsonSent.details));
      assert.ok(jsonSent.details.length >= 1);
    });
  });

  describe('authSchema', () => {
    it('deve validar registro com dados válidos', () => {
      const valid = {
        name: 'Ana Maria',
        username: 'anamaria_croche',
        email: 'Ana@FioAFio.com',
        password: 'senhaforte123'
      };
      const parsed = registerSchema.parse(valid);
      assert.equal(parsed.name, 'Ana Maria');
      assert.equal(parsed.email, 'ana@fioafio.com'); // sanitizado/lowercase
    });

    it('deve rejeitar registro com e-mail inválido e senha curta', () => {
      const invalid = {
        name: 'A',
        username: 'inv@lid username!',
        email: 'not-an-email',
        password: '12'
      };
      assert.throws(() => registerSchema.parse(invalid));
    });
  });

  describe('postSchema', () => {
    it('deve validar criação de post válido', () => {
      const validPost = {
        title: 'Bolsa de Crochê Primavera',
        content: 'Passo a passo completo com pontos baixos e altos.',
        category: 'Acessórios'
      };
      const parsed = createPostSchema.parse(validPost);
      assert.equal(parsed.title, 'Bolsa de Crochê Primavera');
    });

    it('deve rejeitar post com título ou conteúdo muito curto', () => {
      const invalidPost = {
        title: 'Oi',
        content: 'Fio'
      };
      assert.throws(() => createPostSchema.parse(invalidPost));
    });
  });

  describe('videoLessonSchema', () => {
    it('deve validar vídeo-aula com coerção de preço', () => {
      const validLesson = {
        title: 'Manta em Ponto Pipoca',
        subtitle: 'Aprenda a tecer mantas volumosas e macias',
        category: 'Decoração',
        price: '49.90',
        description: 'Curso completo gravado em alta resolução com gráficos inclusos.'
      };
      const parsed = createVideoLessonSchema.parse(validLesson);
      assert.equal(typeof parsed.price, 'number');
      assert.equal(parsed.price, 49.9);
    });

    it('deve rejeitar aula sem categoria ou preço negativo', () => {
      const invalidLesson = {
        title: 'Manta Pipoca',
        category: '',
        price: -10,
        description: 'Curto'
      };
      assert.throws(() => createVideoLessonSchema.parse(invalidLesson));
    });
  });

  describe('commentSchema', () => {
    it('deve validar comentário válido', () => {
      const validComment = {
        postId: 'post-1',
        text: 'Lindo trabalho! Qual linha você utilizou?'
      };
      const parsed = createCommentSchema.parse(validComment);
      assert.equal(parsed.postId, 'post-1');
    });

    it('deve rejeitar comentário sem texto ou postId', () => {
      assert.throws(() => createCommentSchema.parse({ postId: '', text: '' }));
    });
  });

  describe('storySchema', () => {
    it('deve validar criação de story', () => {
      const valid = { mediaUrl: 'https://images.unsplash.com/photo-1' };
      const parsed = createStorySchema.parse(valid);
      assert.equal(parsed.mediaUrl, 'https://images.unsplash.com/photo-1');
    });

    it('deve rejeitar story sem mediaUrl', () => {
      assert.throws(() => createStorySchema.parse({ mediaUrl: '' }));
    });
  });

  describe('purchaseSchema', () => {
    it('deve validar compra com lessonId', () => {
      const validPurchase = {
        lessonId: 'aula-1',
        paymentMethod: 'PIX',
        amount: '35.00'
      };
      const parsed = createPurchaseSchema.parse(validPurchase);
      assert.equal(parsed.lessonId, 'aula-1');
      assert.equal(parsed.amount, 35);
    });
  });
});
