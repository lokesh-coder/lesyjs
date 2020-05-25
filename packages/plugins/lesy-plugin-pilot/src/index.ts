export default {
  features: [`${__dirname}/pilot.feature.ts`],
  middlewares: [`${__dirname}/interceptor.middleware.ts`],
  commands: [`${__dirname}/pilot.command.ts`, `${__dirname}/run.command.ts`],
};
