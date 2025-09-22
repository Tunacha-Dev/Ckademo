"use client";

import React, { useMemo, useState } from "react";

/** Utility */
function cx(...list: Array<string | false | null | undefined>) {
  return list.filter(Boolean).join(" ");
}

/** Rarity */
const rarity = {
  common: "ring-[2px] ring-gray-500",
  uncommon: "ring-[3px] ring-[#3F6B4E] shadow-[0_0_16px_#3F6B4E80]",
  rare: "ring-[3px] ring-[#3E62B8] shadow-[0_0_16px_#3E62B880]",
  epic: "ring-[3px] ring-[#5C3A7E] shadow-[0_0_18px_#5C3A7E80]",
  legendary: "ring-[3px] ring-[#C9A34A] shadow-[0_0_20px_#C9A34A80]",
  mythic: "ring-[3px] ring-[#B02E2E] shadow-[0_0_22px_#B02E2E80]",
} as const;

function ResourceBar({ label, color, value }: { label: string; color: string; value: number }) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <div className="relative h-7 rounded-xl border-2 bg-[#1B1A1F] overflow-hidden" style={{ borderColor: color }}>
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 40%, rgba(0,0,0,0.25) 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute left-0 top-0 h-full rounded-xl will-change-transform"
        style={{
          width: `${pct * 100}%`,
          background: `linear-gradient(180deg, ${color}, ${color})`,
          maskImage:
            "radial-gradient(16px 8px at 16px 8px, #000 65%, transparent 66%), linear-gradient(#000,#000)",
          WebkitMaskComposite: "source-over" as any,
          animation: "flow 4s linear infinite",
          backgroundSize: "200px 100%",
          filter: "drop-shadow(0 0 8px rgba(0,0,0,0.5))",
        }}
      />
      <span className="absolute inset-0 text-xs tracking-wide flex items-center justify-center font-semibold text-[#D9C7A3]">
        {label}
      </span>
    </div>
  );
}

function Slot({ label = "", r = "common" as keyof typeof rarity }) {
  return (
    <div
      className={cx(
        "w-16 h-16 rounded-md border-2 bg-[#2A2A31] hover:scale-105 transition-transform",
        "border-[#5C3E2E]",
        rarity[r]
      )}
      title={label}
    />
  );
}

type StatKey = "STR" | "DEX" | "INT" | "ARMOR" | "CRIT";
type SlotKey =
  | "Helmet"
  | "Chest"
  | "Weapon"
  | "Shield"
  | "Boots"
  | "Ring"
  | "Amulet"
  | "Gloves"
  | "Belt";
type Item = {
  id: string;
  name: string;
  slot: SlotKey;
  rarity: keyof typeof rarity;
  stats: Partial<Record<StatKey, number>>;
};

export default function Wireframes() {
  const [tab, setTab] = useState<"character" | "inventory">("character");
  const [hoverItem, setHoverItem] = useState<null | Item>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const hp = 0.55, mp = 0.72, xp = 0.32;

  const equipped: Record<SlotKey, Item | null> = {
    Helmet: { id: "h1", name: "Rusty Helm", slot: "Helmet", rarity: "common", stats: { ARMOR: 6 } },
    Chest: { id: "c1", name: "Padded Jerkin", slot: "Chest", rarity: "uncommon", stats: { ARMOR: 10, DEX: 1 } },
    Weapon: { id: "w1", name: "Knight's Shortsword", slot: "Weapon", rarity: "rare", stats: { STR: 3, CRIT: 2 } },
    Shield: { id: "s1", name: "Biscuit Tray", slot: "Shield", rarity: "common", stats: { ARMOR: 5 } },
    Boots: null,
    Ring: { id: "r1", name: "Crumbly Band", slot: "Ring", rarity: "epic", stats: { CRIT: 4 } },
    Amulet: null,
    Gloves: null,
    Belt: null,
  };

  const inventoryItems: Item[] = [
    { id: "i1", name: "Splintered Buckler", slot: "Shield", rarity: "uncommon", stats: { ARMOR: 8 } },
    { id: "i2", name: "Twig Dagger", slot: "Weapon", rarity: "common", stats: { DEX: 2 } },
    { id: "i3", name: "Sage's Loop", slot: "Ring", rarity: "legendary", stats: { INT: 5, CRIT: 3 } },
    { id: "i4", name: "Pants of Mild Confidence", slot: "Belt", rarity: "rare", stats: { STR: 1, ARMOR: 3 } },
    { id: "i5", name: "Boots of Squeak", slot: "Boots", rarity: "uncommon", stats: { DEX: 1 } },
  ];

  const slots = useMemo(() => {
    const keys = Object.keys(rarity) as Array<keyof typeof rarity>;
    return Array.from({ length: 25 }).map((_, i) => keys[i % keys.length]);
  }, []);

  function onMouseMove(e: React.MouseEvent) {
    setCursor({ x: e.clientX, y: e.clientY });
  }

  return (
    <div className="min-h-screen bg-[#1B1A1F] text-[#D9C7A3] p-4 font-sans" onMouseMove={onMouseMove}>
      <style>{`
        @keyframes flow { from{background-position:0 0} to{background-position:200px 0} }
      `}</style>

      {/* Minimap */}
      <div className="fixed top-3 left-3">
        <div
          className="w-28 h-28 rounded-full border-[6px] shadow-xl flex items-center justify-center text-xs"
          style={{
            borderColor: "#C9A34A",
            background:"radial-gradient(80% 80% at 50% 40%, #D9C7A3 0%, #B79D79 60%, #6b5a42 100%)",
            boxShadow:"inset 0 0 0 2px rgba(0,0,0,.6), 0 6px 20px rgba(0,0,0,.5)",
          }}
        >Minimap</div>
      </div>

      {/* Quest tracker */}
      <div className="fixed top-3 right-3 max-w-sm rounded-lg border-2 shadow-lg p-3"
        style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg, #E6D9BD, #D9C7A3 60%, #C7B28E)", color:"#2A2A31" }}>
        <div className="font-bold text-[#5C3E2E] mb-1">Quests</div>
        <ul className="list-disc ml-5 space-y-1">
          <li>Do the funny thing</li>
          <li>Collect 5 Rotten Fish</li>
        </ul>
      </div>

      {/* Bars */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-24 w-[min(720px,90vw)] space-y-2">
        <ResourceBar label="HP" color="#B02E2E" value={hp} />
        <ResourceBar label="Mana" color="#3E62B8" value={mp} />
        <ResourceBar label="XP" color="#3F6B4E" value={xp} />
      </div>

      {/* Quick slots */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
        {[0,1,2,3,4,5,6,7].map((i) => (
          <div key={i} className={cx("relative")}>
            <Slot r={(Object.keys(rarity) as Array<keyof typeof rarity>)[i % 6]} />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-[#C9A34A] font-bold">{i + 1}</div>
          </div>
        ))}
      </div>

      {/* Panel */}
      <section className="mx-auto mt-36 w-[min(1100px,95vw)] rounded-2xl border-4 p-5 shadow-2xl"
        style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg, #2A2A31, #26252B 40%, #1F1E23)", boxShadow:"0 10px 30px rgba(0,0,0,.6)"}}>
        <div className="flex gap-2 mb-4">
          {([{ id:"character", label:"Character" }, { id:"inventory", label:"Inventory" }] as const).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={cx(
              "px-4 py-2 rounded-lg border-2 font-semibold transition",
              tab === t.id ? "bg-[#B02E2E] border-[#C9A34A] text-white" : "bg-[#5C3E2E] border-[#3F2A20] hover:brightness-110"
            )}>{t.label}</button>
          ))}
        </div>

        {tab === "character" && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 space-y-4">
              <div className="h-44 rounded-xl border-2 flex items-center justify-center text-sm"
                style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg,#D9C7A3,#C9B38C 60%,#B79D79)", color:"#2A2A31" }}>
                Character Portrait
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["Helmet","Chest","Weapon","Shield","Boots","Ring","Amulet","Gloves","Belt"] as SlotKey[]).map((s,i) => (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <div className="relative"
                      onMouseEnter={() => setHoverItem(equipped[s])}
                      onMouseLeave={() => setHoverItem(null)}>
                      <Slot r={(equipped[s]?.rarity ?? (Object.keys(rarity) as Array<keyof typeof rarity>)[i % 6]) as keyof typeof rarity} />
                    </div>
                    <span className="text-[10px] text-center opacity-80">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border-2 p-4" style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg,#2C2B31,#24232A)" }}>
                <h3 className="font-bold text-[#C9A34A] mb-3">Primary Stats</h3>
                <ul className="space-y-2 text-sm">
                  <li>STR: +12</li><li>DEX: +8</li><li>INT: +5</li><li>VIT: +10</li>
                </ul>
              </div>

              <div className="rounded-xl border-2 p-4" style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg,#2C2B31,#24232A)" }}>
                <h3 className="font-bold text-[#C9A34A] mb-3">Derived</h3>
                <ul className="space-y-2 text-sm">
                  <li>Crit Chance: 7.5%</li><li>Armor: 26</li><li>Move Speed: 104%</li><li>Magic Resist: 12</li>
                </ul>
              </div>

              <div className="col-span-2 rounded-xl border-2 p-4" style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg,#2C2B31,#24232A)" }}>
                <h3 className="font-bold text-[#C9A34A] mb-3">Backpack</h3>
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const itm = inventoryItems[i % inventoryItems.length];
                    return (
                      <div key={i} onMouseEnter={() => setHoverItem(itm)} onMouseLeave={() => setHoverItem(null)}>
                        <Slot r={itm.rarity} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "inventory" && (
          <div className="rounded-xl border-2 p-4" style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg,#2C2B31,#24232A)" }}>
            <h3 className="font-bold text-[#C9A34A] mb-3">Inventory</h3>
            <div className="grid grid-cols-10 gap-2">
              {inventoryItems.map((itm, i) => (
                <div key={i} onMouseEnter={() => setHoverItem(itm)} onMouseLeave={() => setHoverItem(null)}>
                  <Slot r={itm.rarity} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Tooltip item={hoverItem} cursor={cursor} equippedLookup={equipped} />
    </div>
  );
}

/** Tooltip + Compare */
function StatRow({ name, val }: { name: string; val: number }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="opacity-80">{name}</span>
      <span className="font-bold">{val > 0 ? `+${val}` : val}</span>
    </div>
  );
}

function Tooltip({ item, cursor, equippedLookup }: { item: Item | null; cursor: { x: number; y: number }; equippedLookup: Record<string, Item | null> }) {
  if (!item) return null;
  const eq = equippedLookup[item.slot as string];

  const compareKeys = ["STR","DEX","INT","ARMOR","CRIT"] as const;
  const delta = (key: typeof compareKeys[number]) => (item.stats?.[key] ?? 0) - (eq?.stats?.[key] ?? 0);

  return (
    <div className="fixed z-50 w-[300px] pointer-events-none" style={{ left: cursor.x + 16, top: cursor.y + 16 }}>
      <div className={cx("rounded-xl border-2 p-3 shadow-2xl mb-2", rarity[item.rarity])}
           style={{ background:"linear-gradient(180deg,#E6D9BD,#D9C7A3 60%,#C7B28E)", color:"#2A2A31" }}>
        <div className="font-bold text-sm mb-1">{item.name}</div>
        <div className="text-[10px] uppercase tracking-wide opacity-80 mb-2">{item.slot}</div>
        <div className="space-y-1">{Object.entries(item.stats).map(([k, v]) => <StatRow key={k} name={k} val={v as number} />)}</div>
      </div>

      {eq && (
        <div className="rounded-xl border-2 p-3 shadow-2xl" style={{ borderColor:"#C9A34A", background:"linear-gradient(180deg,#2C2B31,#24232A)" }}>
          <div className="text-[#C9A34A] font-bold text-xs mb-1">Compare vs Equipped</div>
          <div className="text-[11px] opacity-80 mb-2">{eq.name}</div>
          <div className="space-y-1">
            {compareKeys.map((k) => {
              const d = delta(k);
              return (
                <div key={k} className="flex justify-between text-xs">
                  <span>{k}</span>
                  <span className={d > 0 ? "text-green-400" : d < 0 ? "text-red-400" : "opacity-70"}>
                    {d > 0 ? "+" : d < 0 ? "" : "±"}{d}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
