const utilityLinks = ['Weer', 'TV-Gids', 'Meld Nieuws', 'Digitale Krant', 'Shop', 'Over Ons'];
const primaryLinks = ['Nieuws', 'Sport', 'Showbizz', 'Nina', 'Regio', 'Kijk', 'Puzzel', 'Podcast'];
const secondaryLinks = ['Opinie', 'Mijn Geld', 'VTM NIEUWS', 'Eten', 'Tech', 'Mobiliteit', 'Gezondheid', 'Woon'];

export const Header = () => (
  <header className="shadow-sm">
    <div className="bg-white text-xs font-semibold text-blue-700">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2">
        <div className="flex flex-wrap gap-4">
          {utilityLinks.map((link) => (
            <a key={link} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </div>
        <a href="#" className="hover:underline">
          Klantenservice
        </a>
      </div>
    </div>

    <div className="bg-[#e30613] text-white">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-4 py-3">
        <div className="rounded-md bg-red-700 px-4 py-2 text-5xl font-black leading-none">HLN</div>
        <nav
          className="flex flex-wrap items-center gap-6 font-black uppercase"
          style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}
        >
          {primaryLinks.map((link) => (
            <a key={link} href="#" className="text-4xl leading-none hover:opacity-80">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </div>

    <div className="border-b bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-5 px-4 py-2 text-base font-semibold">
        {secondaryLinks.map((link) => (
          <a key={link} href="#" className="hover:underline">
            {link}
          </a>
        ))}
      </div>
    </div>
  </header>
);
