"use client";

import { useMemo, useState } from "react";
import { distributors, type Distributor } from "@/lib/content";
import { useStore } from "@/lib/store";
import { Compass, MapPin, Phone, Search, WhatsApp } from "./Icons";

const states = ["All states", ...Array.from(new Set(distributors.map((item) => item.state)))];

const distanceKm = (aLat: number, aLng: number, bLat: number, bLng: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const position = (item: Distributor) => {
  const x = ((item.lng - 2.5) / 12.5) * 560 + 20;
  const y = (1 - (item.lat - 4) / 10) * 480 + 20;
  return { x: Math.max(28, Math.min(576, x)), y: Math.max(26, Math.min(508, y)) };
};

export default function DistributorLocator() {
  const { toast } = useStore();
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All states");
  const [activeId, setActiveId] = useState(distributors[0].id);
  const [distances, setDistances] = useState<Record<string, number> | null>(null);
  const [locating, setLocating] = useState(false);

  const list = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = distributors.filter((item) => {
      const matchesState = state === "All states" || item.state === state;
      const matchesTerm =
        !term ||
        `${item.name} ${item.city} ${item.state} ${item.address} ${item.coverage} ${item.type}`
          .toLowerCase()
          .includes(term);
      return matchesState && matchesTerm;
    });
    if (distances) return [...filtered].sort((a, b) => (distances[a.id] ?? 0) - (distances[b.id] ?? 0));
    return filtered;
  }, [query, state, distances]);

  const active = distributors.find((item) => item.id === activeId) ?? distributors[0];

  const locate = () => {
    if (!navigator.geolocation) {
      toast("Location is not available", "error", "Search by city or state instead.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next: Record<string, number> = {};
        distributors.forEach((item) => {
          next[item.id] = distanceKm(position.coords.latitude, position.coords.longitude, item.lat, item.lng);
        });
        setDistances(next);
        setLocating(false);
        const nearest = [...distributors].sort((a, b) => next[a.id] - next[b.id])[0];
        setActiveId(nearest.id);
        setState("All states");
        toast("Sorted by distance", "success", `Nearest: ${nearest.name}, ${Math.round(next[nearest.id])} km away.`);
      },
      () => {
        setLocating(false);
        toast("We could not get your location", "error", "Search by city or state instead.");
      },
      { timeout: 8000 },
    );
  };

  return (
    <div className="locator">
      <div className="locator__panel">
        <div className="locator__toolbar">
          <div className="locator-search">
            <Search size={17} />
            <label htmlFor="locator-search" className="sr-only">
              Search distributors
            </label>
            <input
              id="locator-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search city, state or area…"
            />
          </div>
          <button type="button" className="geo-btn" onClick={locate} data-loading={locating}>
            <Compass size={15} /> {locating ? "Locating…" : "Near me"}
          </button>
        </div>

        <div className="state-chips" role="group" aria-label="Filter by state">
          {states.map((item) => (
            <button
              type="button"
              className="chip"
              key={item}
              data-active={state === item}
              onClick={() => setState(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="locator__count">
          {list.length} location{list.length === 1 ? "" : "s"}
          {distances ? " · sorted by your distance" : " · select one to see it on the map"}
        </p>

        <div className="locator__list" data-lenis-prevent>
          {list.length === 0 ? (
            <div className="empty-state" style={{ padding: "30px 14px" }}>
              <div className="empty-state__icon">
                <MapPin size={26} />
              </div>
              <h3>No location found</h3>
              <p>We may still deliver to you — message us and we will check your area.</p>
            </div>
          ) : (
            list.map((item) => (
              <div
                className="locator-card"
                key={item.id}
                data-active={item.id === activeId}
                onClick={() => setActiveId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveId(item.id);
                  }
                }}
              >
                <div className="locator-card__top">
                  <div>
                    <h3>{item.name}</h3>
                    <span className="small muted">
                      {item.city}, {item.state}
                    </span>
                  </div>
                  <span className="locator-card__type" data-type={item.type}>
                    {item.type}
                  </span>
                </div>
                <div className="locator-card__meta">
                  <div>
                    <MapPin size={13} />
                    <span>{item.address}</span>
                  </div>
                  <div>
                    <span className="small">
                      Coverage: {item.coverage} · {item.hours}
                    </span>
                  </div>
                </div>
                <div className="locator-card__foot">
                  {distances ? (
                    <span className="locator-card__distance">{Math.round(distances[item.id])} km away</span>
                  ) : (
                    <span className="locator-card__distance">{item.coverage.split(",")[0]}</span>
                  )}
                  <div className="locator-card__actions">
                    <a
                      className="mini-btn"
                      href={`tel:${item.phone.replace(/\s/g, "")}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Phone size={12} /> Call
                    </a>
                    <a
                      className="mini-btn mini-btn--wa"
                      href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <WhatsApp size={12} /> WhatsApp
                    </a>
                    <a
                      className="mini-btn"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.address}, ${item.city}, Nigeria`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="map-panel">
        <div className="map-panel__grid" aria-hidden />
        <span className="map-panel__hint">Delivery network · not to scale</span>
        <svg viewBox="0 0 600 540" role="img" aria-label="AQUARIS distributor network across Nigeria">
          {distributors
            .filter((item) => item.id !== distributors[0].id)
            .map((item) => {
              const from = position(distributors[0]);
              const to = position(item);
              return (
                <line
                  key={`line-${item.id}`}
                  className="map-line"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  style={{ opacity: item.id === activeId ? 1 : 0.45 }}
                />
              );
            })}

          {distributors.map((item) => {
            const { x, y } = position(item);
            const isActive = item.id === activeId;
            return (
              <g
                key={item.id}
                className="map-node"
                data-active={isActive}
                onClick={() => setActiveId(item.id)}
                role="button"
                tabIndex={0}
                aria-label={`${item.name}, ${item.city}`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveId(item.id);
                  }
                }}
              >
                <circle className="map-node__halo" cx={x} cy={y} r={isActive ? 18 : 12}>
                  <animate
                    attributeName="r"
                    values={isActive ? "12;22;12" : "10;14;10"}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  className="map-node__dot"
                  cx={x}
                  cy={y}
                  r={isActive ? 6 : 4}
                  onClick={() => setActiveId(item.id)}
                />
                <text x={x + 10} y={y + 3}>
                  {item.city}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="map-panel__card">
          <strong>{active.name}</strong>
          <span>
            {active.address} · {active.hours}
          </span>
        </div>

        <div className="map-panel__legend">
          <span>
            <i /> Distributor
          </span>
          <span>
            <i className="dim" /> Nationwide routes
          </span>
        </div>
      </div>
    </div>
  );
}
