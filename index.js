const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');
const cors = require('cors');

const app = express();
app.use(express.json());

// Função modificada para formatar a saída
async function getData(query) {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
      return result.rows;
    } catch (err) {
      console.error(err);
      return [];
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
app.use(cors());


// Rota para tb_site_time
app.get('/site_time', async (req, res) => {
    const query = 'SELECT id, url_image AS url, nome, descricao, url_linkedin, url_github FROM tb_site_time';
    const data = await getData(query);
    res.json(data);
  });
  
  // Rota para tb_site_disciplinas
  app.get('/site_disciplinas', async (req, res) => {
    const query = 'SELECT id, url_img AS url, titulo, descricao FROM tb_site_disciplinas';
    const data = await getData(query);
    res.json(data);
  });
  
  // Rota para tb_site_cases
  app.get('/site_cases', async (req, res) => {
    const query = 'SELECT id, url_logo AS url, titulo, descricao, botao FROM tb_site_cases';
    const data = await getData(query);
    res.json(data);
  });
  

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
