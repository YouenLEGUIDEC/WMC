import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page empty">
      <p className="eyebrow">PETIT DÉTOUR IMPRÉVU · 404</p>
      <h1>
        Cette route
        <br />
        <em>n’existe pas encore.</em>
      </h1>
      <p>Retrouve le peloton, il n’est pas loin.</p>
      <Link href="/dashboard" className="btn">
        Revenir au peloton
      </Link>
    </div>
  );
}
