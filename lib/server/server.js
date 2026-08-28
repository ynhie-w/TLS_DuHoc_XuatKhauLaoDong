import app from "../api/index.js";

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});