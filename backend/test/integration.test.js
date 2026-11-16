import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

describe('Express + Zod Integration Tests', () => {
  let server;
  let baseUrl;

  before((_, done) => {
    const app = createApp();
    server = app.listen(0, () => {
      baseUrl = `http://localhost:${server.address().port}`;
      done();
    });
  });

  after((_, done) => {
    server.close(done);
  });

  it('deve rejeitar POST /auth/login com 400 e campo faltante', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'teste@fioafio.com' })
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.error, 'Erro de validação');
    assert.ok(data.details.some(d => d.field === 'password'));
  });

  it('deve rejeitar POST /posts com 400 quando título e conteúdo forem curtos', async () => {
    const res = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'A', content: 'B' })
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.error, 'Erro de validação');
    assert.ok(data.details.some(d => d.field === 'title'));
    assert.ok(data.details.some(d => d.field === 'content'));
  });

  it('deve rejeitar POST /videoLessons com 400 quando preço for inválido', async () => {
    const res = await fetch(`${baseUrl}/videoLessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Bolsa de Crochê',
        category: 'Vestuário',
        price: -5,
        description: 'Descrição longa'
      })
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.error, 'Erro de validação');
    assert.ok(data.details.some(d => d.field === 'price'));
  });
});
