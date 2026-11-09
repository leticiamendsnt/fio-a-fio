import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVideoLessons } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecord } from '../../services/api';
import { useRole } from '../../context/RoleContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CreditCard, QrCode, ArrowLeft, CheckCircle } from 'lucide-react';

export const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useRole();
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);
  const lesson = lessons.find((v) => v.id === id) || lessons[0];
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const purchaseMutation = useMutation({
    mutationFn: async (purchaseData) => {
      return await createRecord('purchases', purchaseData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['purchases'] });
      setTimeout(() => {
        navigate(`/confirmacao-compra/${lesson.id}`);
      }, 1000);
    },
  });

  if (!lesson) return <p role="status">Carregando aula…</p>;

  const handlePay = (e) => {
    e.preventDefault();
    purchaseMutation.mutate({
      userId: currentUser.id,
      lessonId: lesson.id,
      lessonProgressPercent: 0,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'Concluído',
      amount: lesson.price,
      paymentMethod: paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito',
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Link to={`/compra/${lesson.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para o Resumo
      </Link>

      <Card className="shadow-lg border-rose-200">
        <CardHeader className="bg-rose-50/50">
          <h1 className="text-lg font-extrabold text-zinc-900">Pagamento Simulado</h1>
          <p className="text-xs text-zinc-500">Etapa 2 de 3 — Escolha o método de pagamento</p>
        </CardHeader>

        <CardBody className="space-y-6">
          <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700">
            <span>Total da compra:</span>
            <span className="text-base font-extrabold text-rose-600">
              R$ {lesson.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Payment Option Tabs */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'pix'
                  ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-300'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <QrCode size={24} className="text-rose-500" />
              <span className="text-xs">PIX (Instantâneo)</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'card'
                  ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-300'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <CreditCard size={24} className="text-rose-500" />
              <span className="text-xs">Cartão de Crédito</span>
            </button>
          </div>

          {/* Payment Form / Demo */}
          <form onSubmit={handlePay} className="space-y-4">
            {paymentMethod === 'pix' ? (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-center space-y-2">
                <p className="text-xs font-bold text-emerald-900">QR Code PIX Simulado</p>
                <div className="w-32 h-32 bg-zinc-900 mx-auto rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                  📱 QR
                </div>
                <p className="text-[11px] text-emerald-700">
                  Clique no botão abaixo para simular a confirmação imediata do pagamento via PIX.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <Input label="Número do Cartão" placeholder="4532 •••• •••• 8892" required />
                <Input label="Nome Impresso no Cartão" placeholder="MARIA DA SILVA" required />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Validade" placeholder="12/28" required />
                  <Input label="CVV" placeholder="123" required />
                </div>
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={isProcessing}>
              {isProcessing ? (
                <span>Processando Pagamento...</span>
              ) : (
                <span>Confirmar e Finalizar Compra</span>
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
