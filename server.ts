import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Task {
    id: ID!
    content: String!
  }

  type Column {
    id: ID!
    title: String!
    tasks: [Task!]!
  }

  type Query {
    columns: [Column!]!
  }

  type Mutation {
    addTask(columnId: ID!, content: String!): Task
  }
`;

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const columns: Column[] = [
  {
    id: 'column-1',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'First task' },
      { id: 'task-2', content: 'Second task' },
    ],
  },
  {
    id: 'column-2',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'First task' },
      { id: 'task-2', content: 'Second task' },
    ],
  },
];

const resolvers = {
  Query: {
    columns: (): Column[] => columns,
  },
  Mutation: {
    addTask: (_: any, { columnId, content }: { columnId: string; content: string }): Task => {
      const column = columns.find(col => col.id === columnId);
      if (!column) throw new Error('Column not found');
      const newTask: Task = { id: `task-${Date.now()}`, content };
      column.tasks.push(newTask);
      return newTask;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});