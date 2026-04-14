import { useNavigate } from 'react-router';

const PokemonCard = ({ data }) => {
  const redirectTo = useNavigate();

  const getStat = (statName) =>
    data?.stats?.find((item) => item?.stat?.name === statName)?.base_stat ?? 0;

  const hp = getStat('hp');
  const atk = getStat('attack');
  const def = getStat('defense');

  const types = data?.types?.map((item) => item?.type?.name).filter(Boolean) ?? [];
  const primaryType = data?.types?.find((item) => item?.slot === 1)?.type?.name ?? types[0];

  const typeColor = {
    normal: '#a8a878', fire: '#f08030', water: '#6890f0',
    electric: '#f8d030', grass: '#78c850', ice: '#98d8d8',
    fighting: '#c03028', poison: '#a040a0', ground: '#e0c068',
    flying: '#a890f0', psychic: '#f85888', bug: '#a8b820',
    rock: '#b8a038', ghost: '#705898', dragon: '#7038f8',
    dark: '#705848', steel: '#b8b8d0', fairy: '#ee99ac',
  };

  const primaryColor = typeColor[primaryType] ?? '#78c850';

  const formatText = (value) =>
    value?.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const imageUrl =
    data?.sprites?.other?.['official-artwork']?.front_default ||
    data?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`;

  const statBar = (value, max = 150) => Math.min((value / max) * 100, 100);

  return (
    <div
      className="flex flex-col cursor-pointer group w-full"
      style={{
        backgroundColor: '#0d1a0d',
        border: `1px solid #1a3a1a`,
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = primaryColor;
        e.currentTarget.style.boxShadow = `0 0 16px ${primaryColor}33`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1a3a1a';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={() => redirectTo(`/pokemon/${data?.id}`)}
    >
      {/* Image area */}
      <div
        className="relative flex items-center justify-center p-3"
        style={{ backgroundColor: '#0a120a' }}
      >
        {/* Corner brackets */}
        <span className="absolute top-1 left-1 text-xs font-bold" style={{color: primaryColor}}>┌</span>
        <span className="absolute top-1 right-1 text-xs font-bold" style={{color: primaryColor}}>┐</span>
        <span className="absolute bottom-1 left-1 text-xs font-bold" style={{color: primaryColor}}>└</span>
        <span className="absolute bottom-1 right-1 text-xs font-bold" style={{color: primaryColor}}>┘</span>

        <img
          className="w-24 h-24 object-contain"
          style={{ imageRendering: 'pixelated', filter: `drop-shadow(0 0 8px ${primaryColor}66)` }}
          src={imageUrl}
          alt={data?.name || 'pokemon'}
        />
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-2 p-2" style={{borderTop: '1px solid #1a3a1a'}}>
        {/* ID + name */}
        <div>
          <span className="text-xs font-bold" style={{color: '#1a5c1a'}}>
            #{String(data?.id ?? 0).padStart(3, '0')}
          </span>
          <h2
            className="text-sm font-bold tracking-wider uppercase truncate"
            style={{color: primaryColor}}
          >
            {formatText(data?.name) || '-'}
          </h2>
        </div>

        {/* Types */}
        <div className="flex gap-1 flex-wrap">
          {types.map((typeName) => (
            <span
              key={typeName}
              className="text-xs px-1.5 py-0.5 font-bold tracking-wider uppercase"
              style={{
                color: typeColor[typeName] ?? '#78c850',
                border: `1px solid ${typeColor[typeName] ?? '#78c850'}`,
                backgroundColor: `${typeColor[typeName] ?? '#78c850'}11`,
              }}
            >
              {formatText(typeName)}
            </span>
          ))}
        </div>

        {/* Stat bars */}
        <div className="flex flex-col gap-1">
          {[
            { label: 'HP', value: hp, color: '#ff4444' },
            { label: 'ATK', value: atk, color: '#ff8800' },
            { label: 'DEF', value: def, color: '#4488ff' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-1">
              <span className="text-xs font-bold w-6 shrink-0" style={{color: '#1a5c1a'}}>{label}</span>
              <div className="flex-1 h-1.5" style={{backgroundColor:'#0a120a', border:'1px solid #1a3a1a'}}>
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${statBar(value)}%`, backgroundColor: color }}
                />
              </div>
              <span className="text-xs font-mono w-6 text-right shrink-0" style={{color}}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
