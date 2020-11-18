import { app } from './app';

const run = async () => {
  //   if (!process.env.MATRIX_LIMIT_NUMBER) {
  //     throw new Error('MATRIX_LIMIT_NUMBER env should be provide');
  //   }
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
};

run().catch((err) => {
  console.log(err);
});
