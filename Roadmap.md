# ROADMAP BACKEND PARA O PROJETO LUMINE: EXPRESS + WEBTORRENT + JWT + BANCO IMDB

## Fase 1: Fundamentos e Infraestrutura Básica

### 1. Configuração de Ambiente e Banco de Dados
- Escolher e configurar o banco de dados (Postgres, MongoDB, etc) -- MySql ✔️
- Modelar o esquema dos dados IMDB (filmes, usuários, etc)

### 2. API Básica com Express
- Criar rotas CRUD para filmes, usuários e streaming
- Conectar o banco de dados à API

### 3. Autenticação JWT
- Implementar login e registro de usuários
- Gerar e validar tokens JWT
- Criar middleware para proteger rotas autenticadas

---

## Fase 2: Streaming e Controle de Acesso

### 1. Integração com WebTorrent
- Integrar WebTorrent para streaming de vídeo
- Testar streaming P2P localmente
- Implementar lógica para controle de acesso via JWT antes do streaming

### 2. Controle de Permissões (Access Control)
- Definir roles (ex: admin, usuário comum)
- Middleware para verificar permissões em rotas específicas

### 3. Validação de Dados
- Usar bibliotecas como Joi para garantir dados válidos nas requisições

---

## Fase 3: Segurança e Robustez

### 1. Refresh Tokens JWT
- Implementar refresh tokens para melhorar segurança e experiência do usuário

### 2. Proteção da API
- Configurar rate limiting
- Configurar CORS corretamente
- Usar Helmet para cabeçalhos seguros

### 3. Tratamento de Erros
- Middleware para tratamento centralizado de erros e respostas padrão

---

## Fase 4: Performance e Escalabilidade -- OPCIONAL, A GENTE DECIDE AO DECORRER DO PROJETO

### 1. Cache
- Adicionar cache para consultas frequentes (ex: Redis para dados IMDB e tokens)

### 2. Monitoramento e Logging
- Configurar logs com Winston ou similar
- Integrar com ferramentas como Sentry para monitorar erros

### 3. Escalabilidade
- Configurar cluster no Node.js ou usar PM2
- Preparar para deploy com load balancer

---

## Fase 5: Extras e Melhorias -- OPCIONAL, A GENTE DECIDE AO DECORRER DO PROJETO

### 1. Fallback para Streaming Tradicional (HTTP)
- Implementar fallback caso WebTorrent falhe por NAT/firewall

### 2. Gerenciamento de Upload e Storage
- Definir como os vídeos serão armazenados (S3, local, CDN)

### 3. Testes Automatizados
- Testes unitários para serviços
- Testes de integração para rotas da API

### 4. Documentação da API
- Usar Swagger ou similar para documentar endpoints









# ROADMAP FRONTEND PARA O PROJETO LUMINE: REACT

## Fase 1: Estrutura e Navegação

- Implementar rotas reais para cada item da sidebar (Home, Film Store, Category, Saves, Download)
- Popular cards com dados reais (ex: filmes em destaque, categorias populares)
- Criar componentes reutilizáveis (cards, botões, inputs)
- Tornar a busca funcional, integrando com o backend (buscar filmes/ordens)

---

## Fase 2: Experiência do Usuário e Interatividade

- Implementar autenticação (login/logout) e exibir dados do usuário no perfil
- Criar sistema de favoritos/salvar filmes
- Implementar carrinho de compras e fluxo de checkout básico
- Adicionar feedback visual para ações (loading, erros, sucesso)

---

## Fase 3: Streaming e Vídeo

- Integrar player de vídeo para streaming via WebTorrent
- Criar página de filme com detalhes, sinopse, avaliações e player
- Permitir controle de acesso ao player via token (login)

---

## Fase 4: Melhorias Visuais e Responsividade

- Tornar o layout responsivo para dispositivos móveis e tablets
- Implementar temas (dark/light toggle)
- Ajustar detalhes visuais e animações para melhorar a experiência
- Melhorar acessibilidade (WCAG compliance, navegação por teclado)

---

## Fase 5: Performance, Testes e Deploy -- OPCIONAL, A GENTE DECIDE AO DECORRER DO PROJETO

- Implementar lazy loading para imagens e componentes pesados
- Adicionar testes unitários e end-to-end (ex: Jest, Cypress)
- Otimizar bundle e assets (code splitting, minificação)
- Preparar pipeline para deploy automático e monitoramento de erros