export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { cnpj = "", nf = "" } = req.query || {};
  if (!cnpj || !nf) return res.status(400).json({ message: "Parâmetros obrigatórios: cnpj, nf" });

  const base = process.env.BRUDAM_BASE || "https://multi.brudam.com.br";
  // Ajuste o caminho conforme a doc oficial:
  const url  = new URL("/api/tracking/ocorrencias/minuta", base);
  // Ajuste os nomes dos parâmetros se necessário:
  url.searchParams.set("cnpj_remetente", cnpj);
  url.searchParams.set("numero_nf", nf);

  const headers = { accept: "application/json" };

  // Se a autenticação for via Bearer:
  if (process.env.BRUDAM_TOKEN) headers["authorization"] = `Bearer ${process.env.BRUDAM_TOKEN}`;

  // OU (descomente se sua API exigir token/usuario/senha específicos em headers)
  // if (process.env.BRUDAM_TOKEN) headers["token"] = process.env.BRUDAM_TOKEN;
  // if (process.env.BRUDAM_USER)  headers["usuario"] = process.env.BRUDAM_USER;
  // if (process.env.BRUDAM_PASS)  headers["senha"]   = process.env.BRUDAM_PASS;

  try{
    const upstream = await fetch(url.toString(), { headers });
    const text = await upstream.text();
    res.status(upstream.status)
       .setHeader("Content-Type", upstream.headers.get("content-type") || "application/json; charset=utf-8")
       .send(text);
  }catch(e){
    res.status(502).json({ message:"Erro ao consultar o provedor", error:String(e) });
  }
}
