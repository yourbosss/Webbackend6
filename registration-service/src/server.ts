import { app } from './app';

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Registration service listening on port ${PORT}`);
});
