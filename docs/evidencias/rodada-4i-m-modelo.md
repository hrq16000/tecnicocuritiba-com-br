# Modelo preenchível — Evidências operacionais (Rodada 4I-M)

> Copie este arquivo para `docs/evidencias/4i-m-<AAAA-MM-DD>.md` e preencha.
> Antes de publicar qualquer foto no site ou no Google Business Profile:
>
> ```bash
> npm run photos:audit        # relatório: o que seria removido
> npm run photos:strip        # remove EXIF/GPS/XMP/IPTC (não recomprime)
> npm run check:photo-privacy # gate: falha se sobrou metadado
> ```

## 1. Identificação

| Campo | Valor |
| --- | --- |
| Data da coleta | |
| Responsável | |
| Local (bairro/cidade) | |
| Tipo de atendimento | ( ) Remoto ( ) Domicílio ( ) Bancada/Coleta |
| OS relacionada | |

## 2. Evidências fotográficas

Uma linha por foto. `alt` é obrigatório (SEO + acessibilidade).

| # | Arquivo | O que mostra | Alt text | EXIF removido | Consentimento do cliente |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | ( ) sim | ( ) sim ( ) não se aplica |
| 2 | | | | ( ) sim | ( ) sim ( ) não se aplica |
| 3 | | | | ( ) sim | ( ) sim ( ) não se aplica |

Regras:

- Somente fotos reais do atendimento. **Não usar imagens geradas por IA.**
- Sem rosto, documento, tela com dados do cliente, etiqueta de patrimônio,
  endereço, placa de veículo ou número de série visível.
- Sem número de WhatsApp visível na imagem.

## 3. Evidência técnica do serviço

| Item | Registro |
| --- | --- |
| Sintoma relatado | |
| Diagnóstico confirmado | |
| Procedimento executado | |
| Peças aplicadas (origem: loja / cliente) | |
| Teste final executado | |
| Prazo real (entrada → entrega) | |
| Garantia aplicada (mão de obra / peça) | |

## 4. Checklist de conformidade

- [ ] `npm run check:photo-privacy` passou (sem EXIF/GPS)
- [ ] Nenhum dado pessoal visível nas imagens
- [ ] Alt text preenchido para todas as fotos
- [ ] Textos sem promessa de desempenho/overclock
- [ ] Preços coerentes com `/precos-e-politicas`
- [ ] Consentimento registrado quando a foto envolve equipamento de cliente

## 5. Publicação

| Destino | Status | URL / observação |
| --- | --- | --- |
| Página institucional | ( ) publicado | |
| Página de sintoma relacionada | ( ) publicado | |
| Google Business Profile | ( ) publicado | |

## 6. Observações

<!-- Texto livre -->
