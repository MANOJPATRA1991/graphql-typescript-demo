import { Context } from "graphql-passport/lib/buildContext";
import { Arg, Ctx, MiddlewareFn, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";
import { Ref } from "../types";
import { AuthUser } from "./types/AuthUser";


@Service()
@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) { }

  // Set "request.credentials": "include" in graphql playground
  @Query(returns => User)
  user(@Ctx() ctx: Context<User>): Ref<User> | undefined {
    return ctx.req.user;
  }

  @Mutation(() => User)
  async signup(@Arg("user") { email, password }: AuthUser,
    @Ctx() ctx: Context<User>): Promise<Ref<User> | undefined> {
    const user = await this.userService.createUser(email, password);
    user && ctx.login(<User>user);
    return user;
  }

  @Mutation(() => User)
  async login(@Arg("user") { email, password }: AuthUser,
              @Ctx() ctx: Context<User>): Promise<Ref<User> | undefined> {
    const { user } = await ctx.authenticate(
      'graphql-local',
      { email, password }
    );
    user && ctx.login(user);
    return user;
  }

  @Mutation(() => User)
  async logout(@Ctx() ctx: Context<User>): Promise<Ref<User> | undefined> {
    const { user } = ctx.req;
    ctx.logout();
    return user;
  }
}