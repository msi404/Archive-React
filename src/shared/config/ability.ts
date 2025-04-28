/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbilityBuilder, MongoAbility, createMongoAbility } from "@casl/ability";

// Define actions & subjects
export type Actions = "manage" | "create" | "read" | "update" | "delete";

export type Subjects =
	"HomePage"
	| "CartPage"
	| "BooksPage"
  | "SharedPage"
  | "SentPage"
  | "UsersPage"
	| "TitlesWidget"
	| "DestinationWidget"
  | "all";

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export const defineAbilitiesFor = (user: any) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user.role === 'Admin') {
    can( 'manage', 'all' );

  } else if (user.role === 'User') {
		can('read', 'HomePage')
		can('read', 'BooksPage')
	}

  return build();
};