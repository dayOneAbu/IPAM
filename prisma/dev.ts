import { hash } from "bcryptjs";
import { db } from "~/server/db";
async function seedTopAdmin() {
  const user = await db.user.create({
    data: {
      email: "admin@cbe.com.et",
      password: await hash("&&P@ssw0rd$$23", 10),
      isAdmin: true,
    },
  });
  if (!user) {
    console.log("admin user not seeded");
    return;
  }
  console.log(user);
}
async function seed() {
  await seedTopAdmin();
}

void seed();
