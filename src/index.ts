import { app } from './app';

const run = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
};

run().catch((err) => {
  console.log(err);
});
