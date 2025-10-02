# Build AUTO (diagnóstico)
- `/api/track` tenta **várias combinações** de endpoint e nomes de parâmetros. 
- Se encontrar algo diferente de 404 (200/400/401/403/500), já retorna o resultado e o header `X-Upstream-URL` com a URL usada.
- Se tudo der 404, devolve `{ tried: [...] }` com a lista testada — útil para descobrir o caminho correto.

## Passos
1) Suba este ZIP na Vercel.
2) Variáveis mínimas:
   - `BRUDAM_BASE` = `https://multi.brudam.com.br`
   - `BRUDAM_AUTH_MODE` = `bearer` **ou** `headers`
   - Credenciais conforme o modo escolhido.
3) Teste: `/api/track?cnpj=00000000000000&nf=123`
4) Se continuar 404, veja o JSON retornado (campo `tried`) para identificar qual caminho você precisa e então defina:
   - `BRUDAM_ENDPOINT_PATH`, `BRUDAM_PARAM_CNPJ`, `BRUDAM_PARAM_DOC`.

`/api/debug` mostra a configuração atual (sem expor segredos).
