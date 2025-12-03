# Narrativas Digitais - Recife e as ZEIS

Este projeto é uma plataforma de narrativas digitais ("scrolltelling") focada nas Zonas Especiais de Interesse Social (ZEIS) do Recife. O objetivo é contar a história dessas comunidades através de textos, imagens e mapas interativos.

## 🚀 Como Rodar o Projeto

1.  **Instalar dependências**:
    ```bash
    npm install
    ```
2.  **Rodar o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
3.  Acesse `http://localhost:5173` no seu navegador.

---

## 📂 Estrutura do Projeto

*   **`public/`**: Pasta para imagens e arquivos estáticos. Todas as imagens usadas no site (mapas, fotos das ZEIS) devem ficar aqui.
*   **`src/components/`**: Contém todos os componentes da aplicação.
    *   `Home.jsx`: A página inicial com a introdução, dados e o mapa.
    *   `MapStatic.jsx`: O componente do mapa interativo com os pontos das ZEIS.
    *   `IburaNarrative.jsx`: A narrativa da ZEIS Ibura.
    *   `CasaAmarelaNarrative.jsx`: A narrativa da ZEIS Casa Amarela.
    *   `RosaSelvagemNarrative.jsx`: A narrativa da ZEIS Rosa Selvagem.
*   **`src/components/*.module.css`**: Arquivos de estilo (CSS) específicos para cada componente.

---

## 🛠 Guia de Edição (Para Designers e Desenvolvedores)

### 1. Editando Textos

Os textos estão diretamente nos arquivos `.jsx` dentro de `src/components/`.

*   **Página Inicial (Intro, Dados, Contexto)**: Edite `src/components/Home.jsx`.
*   **Narrativas (Histórias das ZEIS)**: Edite o arquivo correspondente à ZEIS (ex: `CasaAmarelaNarrative.jsx`). Procure pelas tags `<p>` (parágrafos) ou `<h1>`/`<h2>` (títulos).

### 2. Trocando Imagens

1.  Adicione a nova imagem na pasta **`public/`**.
2.  No arquivo `.jsx` do componente, atualize o caminho da imagem na tag `<img>`.
    *   Exemplo: `<img src="/nova-imagem.png" alt="Descrição" />`
    *   **Nota**: O caminho deve começar com `/` e usar o nome exato do arquivo na pasta `public`.

### 3. Ajustando o Mapa (`MapStatic.jsx`)

*   **Adicionar/Remover Pontos**: Edite o array `zeisLocations` em `src/components/MapStatic.jsx`.
    ```javascript
    const zeisLocations = [
        { 
            id: 'nova-zeis', 
            name: 'Nome da ZEIS', 
            top: '50%',   // Posição Vertical
            left: '50%',  // Posição Horizontal
            color: '#CorHex' // Cor do marcador
        },
        // ...
    ];
    ```
*   **Cores dos Marcadores**:
    *   **Ibura**: `#FF4500` (Laranja)
    *   **Casa Amarela**: `#FFD700` (Amarelo)
    *   **Rosa Selvagem**: `#DA70D6` (Roxo)

### 4. Editando Estilos (Cores, Fontes, Layout)

Cada componente tem seu próprio arquivo CSS na mesma pasta.
*   Exemplo: Para mudar o estilo da narrativa do Ibura, edite `src/components/IburaNarrative.module.css`.
*   Classes comuns:
    *   `.container`: Estilo geral da página.
    *   `.header`: Estilo do cabeçalho com a imagem de fundo.
    *   `.textBox`: Caixas de texto translúcidas.
    *   `.imageBox`: Containers das imagens.

---

## 🎨 Identidade Visual

*   **Fonte**: Arial, sans-serif (Padrão web, pode ser alterada no CSS global ou módulos).
*   **Cores de Fundo**:
    *   Ibura: `#4a2c2a` (Tom terroso/escuro)
    *   Casa Amarela: `#003366` (Azul profundo)
    *   Rosa Selvagem: `#003366` (Azul profundo - igual Casa Amarela)

---

## 📦 Build para Produção

Para gerar a versão final para publicação:

```bash
npm run build
```

Os arquivos finais serão gerados na pasta `dist/`.
