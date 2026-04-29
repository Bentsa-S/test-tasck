import { Module } from '@nestjs/common';
import { FormsModule } from './forms/forms.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
    },
    playground: true,
  }),
    FormsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
