export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`club-brand ${compact ? "compact" : ""}`}>
      <img
        src="/brand/watt-malt-light.svg"
        width={255}
        height={69}
        alt="Watt & Malt Club — Brandérion"
      />
    </span>
  );
}
export function ClubSeal() {
  return (
    <div
      className="club-seal"
      aria-label="Watt et Malt, club cycliste, Morbihan"
    >
      <span>CLUB CYCLISTE</span>
      <strong>
        W<span>&</span>M
      </strong>
      <span>BRANDÉRION · 56</span>
    </div>
  );
}
