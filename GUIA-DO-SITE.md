# Portfólio — Bruno Rodrigues | Offensive Security Engineer

Site estático (HTML + CSS + JavaScript puro), sem backend, pronto para publicar no **GitHub Pages**.
Bilíngue: inglês e português, com botão **EN / PT** no canto superior direito.

---

## 1. Como colocar no ar (GitHub Pages)

### Opção A — pelo site do GitHub (sem terminal)

1. Crie uma conta em <https://github.com> (se ainda não tiver).
2. Clique em **New repository**.
3. No campo **Repository name**, digite exatamente:

   ```
   sgtbrunorodrigues.github.io
   ```

   Esse nome exato é o que faz o site ficar em `https://sgtbrunorodrigues.github.io`.
   Se preferir manter o repositório `brunorodrigues-security` que você já criou,
   use ele — o site fica em `https://sgtbrunorodrigues.github.io/brunorodrigues-security/`.
4. Marque **Public** e clique em **Create repository**.
5. Na página do repositório vazio, clique em **uploading an existing file**.
6. Arraste **todo o conteúdo desta pasta** (o `index.html`, o `style.css`,
   o `script.js`, o `GUIA-DO-SITE.md` e as pastas `assets/` e `writeups/`).
   Não arraste a pasta `portfolio` inteira — arraste o que está **dentro** dela.
7. Clique em **Commit changes**.
8. Vá em **Settings → Pages**.
9. Em *Build and deployment → Source*, escolha **Deploy from a branch**.
   Em *Branch*, escolha **main** e a pasta **/ (root)**. Clique em **Save**.
10. Espere 1 a 3 minutos e acesse o endereço que o GitHub mostrar no topo
    dessa mesma tela de Settings → Pages.

### Opção B — pelo terminal

```bash
cd portfolio
git init
git add .
git commit -m "Portfolio inicial"
git branch -M main
git remote add origin https://github.com/sgtbrunorodrigues/brunorodrigues-security.git
git push -u origin main
```

Depois ative o Pages em **Settings → Pages** como no passo 8 acima.

> **Repositório com outro nome?** Funciona também: o site fica em
> `https://sgtbrunorodrigues.github.io/NOME-DO-REPO/`. Só o nome
> `sgtbrunorodrigues.github.io` dá o endereço curto, sem subpasta.

### Domínio próprio (opcional)

Se comprar um domínio (ex.: `brunorodrigues.sec.br`), crie um arquivo chamado
`CNAME` na raiz do repositório contendo só o domínio, e aponte o DNS para o
GitHub Pages conforme a [documentação oficial](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## 2. Links já configurados

Estes já estão preenchidos no `index.html` — não precisa mexer:

- GitHub: <https://github.com/sgtbrunorodrigues>
- LinkedIn: <https://www.linkedin.com/in/brunorodrigues-security/>
- Hack The Box: <https://app.hackthebox.com/users/2247536>
- E-mail: sgtbrunorodrigues@hotmail.com

Se quiser que o botão GITHUB aponte para o repositório do portfólio em vez do
seu perfil, troque `https://github.com/sgtbrunorodrigues` por
`https://github.com/sgtbrunorodrigues/brunorodrigues-security` (aparece em dois
lugares: no botão do topo e na seção CONTACT).

### Endereço do seu site

Como o repositório se chama `brunorodrigues-security` e não
`sgtbrunorodrigues.github.io`, o site vai ficar em:

```
https://sgtbrunorodrigues.github.io/brunorodrigues-security/
```

Funciona normalmente — todos os caminhos do site são relativos. Se preferir o
endereço curto `https://sgtbrunorodrigues.github.io`, crie um repositório novo
com esse nome exato e suba os arquivos nele.

---

## 3. Imagens que você deve adicionar

Duas imagens ainda estão faltando. O site **funciona sem elas** (a de perfil
mostra suas iniciais e a do hero simplesmente não aparece), mas ficam melhor com:

| Arquivo | O que é | Tamanho sugerido |
|---|---|---|
| `assets/hero.jpg` | imagem de fundo da primeira tela | 1920×1080 ou maior, escura |
| `assets/profile.jpg` | sua foto de perfil | quadrada, 600×600 |
| `assets/og-image.jpg` | miniatura ao compartilhar o link | 1200×630 |

Coloque os arquivos com **exatamente esses nomes** dentro de `assets/`.

Se quiser trocar o ícone da aba do navegador, substitua `assets/favicon.svg`.

---

## 4. Estrutura dos arquivos

```
portfolio/
├── index.html                 # o site inteiro (uma página, com âncoras)
├── style.css                  # todo o visual
├── script.js                  # idioma, menu, modais, partículas
├── GUIA-DO-SITE.md            # este arquivo
│
├── assets/
│   ├── favicon.svg            # ícone da aba
│   ├── hero.jpg               # (você adiciona)
│   ├── profile.jpg            # (você adiciona)
│   ├── caramelo-storm.jpg     # logo do time de CTF
│   ├── research/
│   │   └── purple-team-effectiveness.pdf   # apresentação da pós
│   └── certificates/
│       ├── oscp.png
│       ├── emapt.jpg
│       ├── dcpt.jpg
│       ├── desec-pentest-mobile-v2.jpg
│       ├── oversecurity-pentest-mobile-ios.jpg
│       ├── cisco-ethical-hacker.jpg
│       └── ctf/
│           ├── htb-cyber-apocalypse-2026.jpg
│           ├── htb-gcsb-2026-project-nightfall.jpg
│           └── htb-gcsb-2025-operation-blackout.jpg
│
└── writeups/
    └── template.html          # modelo para escrever write-ups
```

**Por que uma página só?** Um portfólio de entrevista é lido de cima a baixo,
e uma página única carrega uma vez e responde na hora quando o recrutador clica
no menu. CSS e JS ficam em arquivos separados justamente para a manutenção ser
fácil. Write-ups são páginas próprias porque cada um é um texto longo e
independente — e assim cada write-up tem uma URL que você pode mandar sozinha.

---

## 5. Como manter o site (tarefas do dia a dia)

### Adicionar uma máquina do HTB / TryHackMe

No `index.html`, procure por `MODELO DE MÁQUINA / LAB`. Tem um bloco pronto
dentro de um comentário `<!-- ... -->`. Apague o `<!--` e o `-->` que envolvem
ele, edite os dados e apague a linha `<p class="empty-note">` logo acima.
Para cada máquina nova, copie o `<article class="lab">` inteiro.

Classes de dificuldade disponíveis: `d-easy`, `d-medium`, `d-hard`.

### Adicionar um certificado

1. Coloque a imagem em `assets/certificates/` (`.jpg` ou `.png`).
2. Copie um bloco `<article class="cert">` e troque o caminho da imagem,
   o `data-full`, o `data-caption` e os textos.
3. Use `type-cert` para certificação com prova, `type-course` para curso e
   `type-ctf` para CTF.

Se o certificado for PDF, converta para imagem primeiro (qualquer conversor
online serve) — o site abre imagens no visualizador ampliado.

### Publicar um write-up

1. Duplique `writeups/template.html` com um nome descritivo, por exemplo
   `writeups/idor-em-api-rest.html`.
2. Escreva o conteúdo (o modelo já tem a estrutura: recon, enumeração,
   exploração, escalonamento, remediação, ATT&CK, referências).
3. No `index.html`, procure por `MODELO DE CARD DE WRITE-UP`, descomente o
   bloco (apague o `<!--` e o `-->`), aponte o `href` para o seu arquivo e
   apague a linha `<p class="empty-note">` logo acima.

### Mudar as cores

Todas as cores do site saem de um bloco só, no topo do `style.css`, dentro de
`:root`. Trocar um valor ali muda o site inteiro — não precisa caçar cor no meio
do arquivo.

| Token | Onde aparece |
|---|---|
| `--bg`, `--bg-2`, `--panel`, `--panel-2` | fundos |
| `--line`, `--line-soft` | bordas |
| `--ember` | cor principal: links, bordas em destaque, brilho |
| `--gold` | destaque secundário |
| `--vermilion` | números de seção, bullets, marcadores |
| `--red` / `--amber` / `--tan` | severidade CRITICAL / MEDIUM / LOW |
| `--green` | "concluído" e "aberto a oportunidades" |
| `--text`, `--text-2`, `--muted` | textos |

Duas cores estão fora do `:root` porque não são CSS: as partículas do fundo, no
`script.js` (procure por `rgba(255, 122, 24`), e o `assets/favicon.svg`.

### Adicionar textos bilíngues

Qualquer elemento com os atributos `data-en` e `data-pt` é traduzido
automaticamente pelo botão EN/PT. Ao criar conteúdo novo, siga o mesmo padrão:

```html
<p data-en="English text here" data-pt="Texto em português aqui"></p>
```

Se o texto for igual nos dois idiomas (nome de ferramenta, sigla), não precisa
dos atributos — deixe o texto direto no HTML.

### Seção MITRE ATT&CK

Existe um bloco pronto, comentado, no fim da seção WRITE-UPS do `index.html`.
Ele está desativado de propósito: nos materiais que você forneceu não havia
mapeamento ATT&CK documentado, e inventar IDs de técnica em um portfólio é o
tipo de coisa que um entrevistador técnico percebe. Quando você mapear técnicas
de verdade em um engajamento ou CTF, descomente o bloco e preencha.

---

## 6. Regras de segurança e privacidade deste site

Este é um site **público**. As duas seções de vulnerabilidades já foram
escritas seguindo estas regras — mantenha-as ao adicionar conteúdo novo:

- Cliente sempre como `CONFIDENTIAL CLIENT`, nunca o nome real.
- Nada de IPs, domínios, subdomínios, endpoints, portas ou nomes de host reais.
- Nada de credenciais, tokens, chaves de API ou trechos de exploit funcional
  contra sistema de cliente.
- Nada de CPF, RG, endereço residencial ou telefone pessoal.
- Não publique os PDFs dos relatórios de pentest. Publique o resumo do achado:
  classe da vulnerabilidade, severidade, CWE, impacto e correção.
- Prova de conceito só de laboratório e CTF, nunca de cliente.

O rodapé do site declara isso explicitamente — é uma sinalização positiva
para quem entrevista você.

---

## 7. O que já está preenchido com informação real

Tudo no site veio dos seus documentos. Nada foi inventado:

- **Experiência**: Banco Carrefour (desde set/2026), AB InBev, CIGE/Exército Brasileiro, unidades do Exército, SPOT.
  Os logos das empresas ficam em `assets/logos/` (quadradinho no canto de cada card, classe `.tl-logo`).
- **Formação**: pós-graduação na UnB (PPEE), tecnólogo em Defesa Cibernética
  pela Estácio, bacharelado em Ciências Contábeis pela Anhanguera.
- **Monografia**: *A Efetividade do Purple Team na Cibersegurança*, orientação
  do Prof. Daniel Chaves Café — com a apresentação em PDF disponível no site.
- **Certificações**: OSCP, eMAPT (ID 186556734), DCPT (chave LDBS-MZOZL-UVND),
  Pentest Mobile iOS da Over Security, Pentest Mobile V2 da Desec,
  Ethical Hacker da Cisco, além de CyberOps e CCNA ITN (sem arquivo de certificado).
- **CTFs**: três eventos globais do Hack The Box com o time CARAMELO STORM,
  com colocação, desafios resolvidos e pontuação reais dos certificados.
- **Perfil HTB**: brunorodrigues88 — rank Skilled, nível 33, 8 máquinas.
- **Vulnerabilidades**: 11 achados de dois pentests autorizados, anonimizados,
  com severidade, CVSS v3.1 e CWE exatamente como estavam nos relatórios.

### Uma observação

O arquivo `Relatório Desafio.pdf` (máquina MonitorsFour do HTB) está assinado no
rodapé de todas as páginas por **Camila Marcolino Lima**, não por você. Por isso
ele ficou de fora do site. Se foi um erro de template e o trabalho é seu, é só
avisar que ele entra como write-up.

---

## 8. Checklist antes de mandar o link numa entrevista

- [ ] Adicionou `assets/profile.jpg` e `assets/hero.jpg`
- [ ] Abriu o site no celular e conferiu que não tem rolagem horizontal
- [ ] Clicou em todos os itens do menu e conferiu que rolam para a seção certa
- [ ] Abriu um certificado e conferiu que a imagem aparece inteira
- [ ] Abriu um card de vulnerabilidade e conferiu o texto nos dois idiomas
- [ ] Releu a seção de vulnerabilidades procurando qualquer dado de cliente
- [ ] Testou o botão EN/PT
