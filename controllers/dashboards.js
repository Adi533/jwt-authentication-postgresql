import { client } from "../pg.cjs";
export const getallusers = async (req, res, next) => {
    const query="select name from users"
    const result = await client.query(query);
    res.json(result.rows);
};