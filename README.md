# Portfólio — Luiz Souza

Site de portfólio pessoal estático, servido por Nginx via Docker. Utilizado como projeto de demonstração de CI/CD com GitHub Actions + Railway.

---

## Rodar localmente com Docker

```bash
# 1. Construir a imagem
docker build -t portfolio .

# 2. Subir o container
docker run -p 8080:8080 portfolio

# 3. Abrir no navegador
#    http://localhost:8080
```

---

## Publicar no GitHub + Railway

### 1. Criar repositório no GitHub

```bash
git init
git add .
git commit -m "feat: portfolio inicial"
git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
git push -u origin main
```

### 2. Criar projeto no Railway

1. Acesse [railway.app](https://railway.app) e faça login.
2. Clique em **New Project** → **Deploy from GitHub repo**.
3. Autorize o Railway a acessar sua conta GitHub e selecione o repositório.
4. O Railway detecta o `Dockerfile` automaticamente e inicia o primeiro deploy.

### 3. Gerar domínio público

1. No painel do Railway, abra o serviço criado.
2. Acesse **Settings → Networking → Generate Domain**.
3. Seu site estará disponível em um endereço `*.up.railway.app`.

---

## Demonstrar o CI/CD em aula

1. Edite o texto da versão no `public/index.html`:
   ```html
   <p class="footer__version">Versão: 1.1.0</p>
   ```
2. Faça commit e push:
   ```bash
   git add public/index.html
   git commit -m "chore: bump version to 1.1.0"
   git push
   ```
3. Acompanhe o pipeline em **Actions** no GitHub — os jobs de build e teste rodam automaticamente.
4. Após o pipeline verde, o Railway detecta o novo commit e re-deploya em segundos.
5. Recarregue o domínio público e veja o número de versão atualizado no rodapé.

---

## Estrutura do projeto

```
/
├── public/
│   ├── index.html        # Página única (SPA via âncoras)
│   ├── css/style.css     # Estilos com variáveis CSS + temas
│   └── js/main.js        # Tema, filtros, form, animações
├── nginx/
│   └── default.conf.template  # Config Nginx com ${PORT}
├── Dockerfile            # nginx:alpine + envsubst automático
├── .dockerignore
├── .github/
│   └── workflows/ci.yml  # Build + smoke test
└── README.md
```
