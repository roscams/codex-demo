export const HeroBanner = () => (
  <section className="mx-auto mt-4 max-w-[1280px] px-4">
    <div className="grid grid-cols-[160px_1fr_160px] gap-4 rounded-sm bg-[#efefef] p-4">
      <div className="space-y-3 text-center">
        <div className="rounded-full border border-gray-400 bg-white px-3 py-1 text-sm">PROEVERTJES</div>
        <div className="rounded-full border border-gray-400 bg-white px-3 py-1 text-sm">KOOKDEMO'S</div>
        <div className="rounded-full border border-gray-400 bg-white px-3 py-1 text-sm">DEMONSTRATIES</div>
      </div>
      <div className="rounded bg-[#f58220] p-6 text-white">
        <p className="text-2xl font-bold uppercase">Dovy Keukenfestival</p>
        <p className="mt-3 text-4xl font-black uppercase leading-tight">Dit weekend haal je het beursgevoel naar de toonzaal</p>
        <button className="mt-4 rounded-full border-2 border-white px-6 py-2 text-lg font-semibold">MEER INFO</button>
      </div>
      <div className="space-y-3 text-center">
        <div className="rounded-full border border-gray-400 bg-white px-3 py-1 text-sm">PROEVERTJES</div>
        <div className="rounded-full border border-gray-400 bg-white px-3 py-1 text-sm">KOOKDEMO'S</div>
        <div className="rounded-full border border-gray-400 bg-white px-3 py-1 text-sm">DEMONSTRATIES</div>
      </div>
    </div>
  </section>
);
