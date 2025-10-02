# Multi Express – Rastreio público (Vercel)

Este pacote permite publicar uma página de rastreio **pública**, sem expor o token no navegador.

## Como publicar (passo a passo leigo)

1) Crie uma conta em https://vercel.com (grátis).
2) Clique em **Add New… → Project → Import** e escolha **"Upload"**.
3) Faça upload do arquivo `multiexpress-rastreio-vercel.zip` (este pacote).
4) Quando a Vercel perguntar por variáveis de ambiente, adicione:
   - `BRUDAM_BASE` = `https://multi.brudam.com.br`
   - **Escolha um modo de autenticação:**
     - Se for **Bearer token**: adicione `BRUDAM_TOKEN` com seu token.
     - OU se for **token/usuario/senha** em headers: adicione `BRUDAM_TOKEN`, `BRUDAM_USER`, `BRUDAM_PASS` (e depois descomente o bloco correspondente em `api/track.js` e remova o do Bearer).
5) Clique **Deploy**. A Vercel gera uma URL (ex.: `https://seuapp.vercel.app`).
6) Abra essa URL e teste preenchendo CNPJ do remetente e o número da NF.

## Onde mudar caso precise

- **Endpoint/parâmetros da Brudam:** edite `api/track.js` nas linhas que montam a URL e os `searchParams`.
- **Autenticação:** no mesmo arquivo, mantenha **só um** bloco (Bearer **OU** token/usuario/senha).
- **Logo/cores/layout:** o arquivo `index.html` usa `logo.png` (pode substituir esse arquivo) e paleta inspirada na marca.

## Dica de CNPJ

O formulário aceita `00.000.000/0000-00` ou apenas números; o servidor repassa sem pontuação.
