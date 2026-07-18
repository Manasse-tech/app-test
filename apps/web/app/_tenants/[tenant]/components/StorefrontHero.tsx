interface StorefrontHeroProps {
  tenantName: string;
  description: string;
}

export function StorefrontHero({ tenantName, description }: StorefrontHeroProps) {
  return (
    <section className="text-center py-12 space-y-4">
      <h1 className="text-5xl font-black tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
        {tenantName}
      </h1>
      <p className="text-neutral-400 max-w-md mx-auto text-sm">{description}</p>
    </section>
  );
}
