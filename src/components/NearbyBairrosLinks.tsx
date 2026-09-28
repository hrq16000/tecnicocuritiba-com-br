import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { nearbyBairros } from "@/lib/nearbyBairros";

/** Links cruzados para bairros vizinhos de Curitiba (SEO local). */
export function NearbyBairrosLinks({ slug, nome }: { slug: string; nome: string }) {
  const list = nearbyBairros(slug);
  if (list.length === 0) return null;
  return (
    <section className="py-10" aria-labelledby="bairros-vizinhos">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 id="bairros-vizinhos" className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Técnico de informática em bairros vizinhos ao {nome}
        </h2>
        <p className="text-muted-foreground mb-5 text-sm">
          Também atendemos a domicílio nos bairros que fazem divisa com o {nome}, em Curitiba.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((b) => (
            <li key={b.slug}>
              <Link
                to={`/bairros/${b.slug}`}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground hover:border-accent/40 hover:text-accent transition-colors"
              >
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                Técnico de informática no {b.nome}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
