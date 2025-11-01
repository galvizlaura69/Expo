import { expect, test } from "@playwright/test";

test("flujo completo con testID: escribir Seiya, buscar y limpiar", async ({ page }) => {
  await page.route("**/api/saints*", async (route, request) => {
    const url = new URL(request.url());
    const name = url.searchParams.get("name")?.toLowerCase();

    if (name === "seiya") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          name: "Seiya",
          constellation: "Pegaso",
          armorType: "Bronce",
          powerLevel: "7.500",
          guardianGod: "Atenea",
        }),
      });
    } else {
      await route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ error: "Caballero no encontrado" }),
      });
    }
  });

  await page.goto("/");

  const input = page.getByTestId("caja-input");
  await input.fill("Seiya");
  await expect(input).toHaveValue("Seiya");

  const botonBuscar = page.getByTestId("save");
  await botonBuscar.click();

  await expect(page.getByTestId("text-1")).toHaveText("🌟 Seiya");
  await expect(page.getByTestId("text-2")).toHaveText("Constelación: Pegaso");
  await expect(page.getByTestId("text-3")).toHaveText("Armadura: Bronce");
  await expect(page.getByTestId("text-4")).toHaveText("Poder: 7.500");
  await expect(page.getByTestId("text-5")).toHaveText("Dios Guardián: Atenea");

  const botonLimpiar = page.getByTestId("clear");
  await botonLimpiar.click();

  await expect(input).toHaveValue("");

  await expect(page.getByTestId("text-1")).toHaveCount(0);
  await expect(page.getByTestId("text-2")).toHaveCount(0);
  await expect(page.getByTestId("text-3")).toHaveCount(0);
  await expect(page.getByTestId("text-4")).toHaveCount(0);
  await expect(page.getByTestId("text-5")).toHaveCount(0);
});
