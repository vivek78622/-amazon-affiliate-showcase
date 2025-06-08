import { neon, Pool, neonConfig, PoolClient } from '@neondatabase/serverless';

// Configure Neon
neonConfig.fetchConnectionCache = true;

// Create a connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a serverless connection
const sql = neon(process.env.DATABASE_URL!);

// Type for database query results
export type QueryResult<T> = T[];

// Helper function to execute queries with proper error handling
export async function executeQuery<T>(query: string, params: any[] = []): Promise<QueryResult<T>> {
  try {
    // Use template literal for proper SQL query formatting
    const result = await sql`${query}`;
    return result as QueryResult<T>;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to execute database query');
  }
}

// Helper function to execute transactions
export async function executeTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw new Error('Failed to execute transaction');
  } finally {
    client.release();
  }
}

// Example usage:
// export async function getPosts() {
//   return executeQuery<Post>('SELECT * FROM posts');
// }

// export async function createPost(post: Omit<Post, 'id'>) {
//   return executeTransaction(async (client) => {
//     const result = await client.query(
//       'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
//       [post.title, post.content, post.author_id]
//     );
//     return result.rows[0];
//   });
// }

export { sql, pool }; 