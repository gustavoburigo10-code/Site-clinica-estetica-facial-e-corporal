# Site — Clínica de Estética Facial e Corporal · Dra. Nayara Magalhães

Site institucional premium (HTML, CSS e JavaScript puros, sem etapa de build).
Para publicar, basta enviar a pasta para a Vercel, Netlify ou qualquer hospedagem estática.

## Estrutura

```
index.html          Página principal (todas as seções)
privacidade.html    Política de privacidade (LGPD)
css/styles.css      Estilos completos + identidade visual
js/main.js          Menu, animações, modal, galeria e formulário
images/             Fotos em WebP (otimizadas)
favicon.svg         Ícone do site
robots.txt          Regras para buscadores
sitemap.xml         Mapa do site
_build/             Material de apoio (fotos originais, recortes e scripts) — não é necessário no ar
```

## Dados da clínica já inseridos

| Item | Valor |
| --- | --- |
| Responsável | Dra. Nayara Magalhães — CRM 41169 |
| WhatsApp | (11) 99893-3728 → `https://wa.me/5511998933728` |
| Endereço | R. Amaral Gama, 380 — conjunto 36, Santana, São Paulo — SP, 02018-001 |
| Horários | Seg. a sex., 9h às 19h · Sáb., 9h às 16h |
| Instagram / e-mail | Não informados — seções não exibidas |

Para alterar o WhatsApp em todo o site, procure por `5511998933728` em `index.html` e `js/main.js`
(podem ser usados os dois arquivos; as mensagens já vêm preenchidas).

## O que ainda depende da clínica

1. **Domínio** — trocar `https://www.nayaramagalhaes.com.br` por `index.html`, `privacidade.html`
   e `sitemap.xml` (marcado com comentário `SUBSTITUA pelo domínio`).
2. **Formação e especializações** — bloco comentado em `index.html`, na seção `#equipe`.
   Nada foi inventado: publique somente dados confirmados.
3. **Depoimentos** — seção comentada em `index.html`, com instruções de ativação.
4. **Fotos** — imagens sem marca d'água são ilustrativas (Unsplash, licença livre) e estão
   identificadas como tal. Substitua quando houver material próprio autorizado.

## Como rodar localmente

Não é preciso compilar. Para ver o site:

```powershell
powershell -ExecutionPolicy Bypass -File "_build\server.ps1"
# abra http://localhost:8899/
```

## Conferência de qualidade

- Lighthouse: Acessibilidade 100 · Boas práticas 100 · SEO 100.
- Imagens em WebP, com `width`/`height` declarados e carregamento diferido (`loading="lazy"`).
- Navegação por teclado, foco visível, contraste validado, formulário com validação,
  campo anti-spam e consentimento (LGPD).
