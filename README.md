<h1 align="center">
<img src="https://github.com/mujapira/Contatos/assets/89225210/f85382f1-1e8d-490f-8630-1ec849f69334" width="70px"/>

<br/>
Contatos
<br/>
</h1>
<h3> 💻 Principais funcionalidades </h3>

- Listagem de usuários cadastrados
- Adicionar contatos com endereço e categorias
- Adicionar categorias
- Remover categorias
- Ver um contato
- Excluir um ou múltiplos contatos
- Pesquisa de contatos por nome, categoria, email, número de telefone

<h3> ✨ Desenvolvido com as seguintes tecnologias</h3>

- Angular
- Java

<h2 align="center">🏃‍♂️Instruções</h1>

Considerando que tudo esteja instalado

Clone o projeto.

```bash
$ git clone https://github.com/mujapira/Contatos.git
```

Para iniciá-lo, siga os passos abaixo:

```bash
#navegue até o back
$ cd contatos\Back

# Iniciar o projeto
$ mvn spring-boot:run

# Anote a porta que a aplicação será iniciada, costuma ser 8080
```

```bash
#navegue até o front
$ cd contatos\Front

# Instalar as dependências
$ npm install

# Iniciar o projeto
$ ng serve

# Altere a string de conexão no frontend,se necessário
backendUrl: 'http://localhost:8080/api'
# Adicione a url do front nos controller para evitar erro de CORS
@CrossOrigin(origins = "http://localhost:4200")
```

O app estará disponível no seu browser pelo endereço local http://localhost:4200/

<h2 align="center">📚Aprendizados</h1>

### **Estrutura do Projeto e Configuração Inicial**

- **Backend (Spring Boot)**
    - Criação de entidades (`Contact`, `Category`, `Address`) e mapeamento das relações (`@ManyToMany`).
    - Configuração de repositórios (`ContactRepository`) e serviços (`ContactService`).
    - Implementação de controladores REST (`ContactController`) para gerenciar os endpoints.
- **Frontend (Angular)**
    - Configuração inicial do projeto Angular.
    - Criação de componentes, serviços e modelos para interagir com a API do backend.
    - Utilização de `HttpClient` para fazer chamadas HTTP ao backend.

### **Mapeamento e Relacionamentos entre Entidades**

- **Mapeamento de Entidades JPA**
    - Uso de anotações como `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@ManyToMany`, e `@JoinTable` para definir e mapear entidades e seus relacionamentos.
    - Compreensão dos diferentes tipos de relacionamentos (`@ManyToMany`, `@OneToMany`, `@ManyToOne`) e como eles são mapeados no banco de dados.

### **Operações CRUD e Repositórios**

- **Repositórios Spring Data JPA**
    - Extensão de `JpaRepository` para operações CRUD básicas.
    - Implementação de consultas personalizadas usando `@Query`.
- **Serviços:**
    - Criação de serviços para encapsular a lógica de negócios.
    - Uso de `@Service` e `@Autowired` para injeção de dependências.

### **Comunicação Frontend-Backend**

- **Endpoints RESTful**
    - Definição de endpoints usando `@RestController`, `@GetMapping`, `@PostMapping`, `@PutMapping`, e `@DeleteMapping`.
    - Tratamento de requisições e respostas HTTP, incluindo o uso de `ResponseEntity`.
- **Chamadas HTTP no Angular**
    - Uso de `HttpClient` para realizar requisições HTTP (`GET`, `POST`, `PUT`, `DELETE`).
    - Manipulação de respostas e erros com `Observable` e operadores RxJS.

### **Deserialização e Serialização de JSON**

- **Deserialização de JSON no Spring Boot**
    - Compreensão de como o Spring Boot lida com a desserialização de JSON em objetos Java.
    - Tratamento de erros de desserialização, como o erro `Cannot deserialize value of type`.
- **Serialização de Dados no Angular:**
    - Preparação de dados no frontend antes de enviá-los para o backend.
    - Garantia de que os tipos de dados enviados correspondem aos tipos esperados pelo backend.

### **Tratamento de Relacionamentos Complexos**

- **Manipulação de Relacionamentos Muitos-para-Muitos**
    - Criação de tabelas de junção (`join tables`) para gerenciar relacionamentos muitos-para-muitos.
    - População de entidades relacionadas no backend com dados recebidos do frontend.

### **Boas Práticas e Padrões de Projeto**

- **Backend**
    - Separação de preocupações usando camadas de serviço, repositório e controlador.
    - Uso de DTOs para transferir dados entre o frontend e o backend.
- **Frontend**
    - Modularização do código Angular para melhorar a organização e a manutenibilidade.
    - Implementação de serviços para gerenciar a lógica de comunicação com o backend.


<h2 align="center">🐱‍🏍 Galeria</h1>
<img src="https://github.com/mujapira/Contatos/assets/89225210/fb4a8c7c-b186-4ff3-8df6-e7b2047422b9" height="" />
<img src="https://github.com/mujapira/Contatos/assets/89225210/3f3f33a0-408a-45d8-a0a5-85cfbf1a28a3" height=""/>
<img src="https://github.com/mujapira/Contatos/assets/89225210/e7fc1e93-ab72-4d61-9176-3a9f73b2e714" height=""/>
<img src="https://github.com/mujapira/Contatos/assets/89225210/49a8ea30-8e90-495a-8815-492045e94bbd" height=""/>

