import { useParams } from "react-router";
import { usePokemonService } from "../context/Context";

const Detail = () => {
  const { id } = useParams();
  const pokemonServiceInstance = usePokemonService();
  const data = pokemonServiceInstance.GetPokemonById(id);

  const getStat = (statName) => (
    data?.stats?.find((item) => item?.stat?.name === statName)?.base_stat ?? '-'
  );

  const hp = getStat('hp');
  const atk = getStat('attack');
  const def = getStat('defense');
  const spAtk = getStat('special-attack');
  const spDef = getStat('special-defense');
  const spd = getStat('speed');

  const types = data?.types?.map((item) => item?.type?.name).filter(Boolean) ?? [];
  const primaryType = data?.types?.find((item) => item?.slot === 1)?.type?.name ?? types[0];

  const typeColor = {
    normal: 'bg-stone-500',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-600',
    ice: 'bg-cyan-400',
    fighting: 'bg-red-700',
    poison: 'bg-violet-600',
    ground: 'bg-amber-600',
    flying: 'bg-sky-500',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-600',
    rock: 'bg-yellow-700',
    ghost: 'bg-indigo-700',
    dragon: 'bg-indigo-500',
    dark: 'bg-neutral-800',
    steel: 'bg-slate-500',
    fairy: 'bg-rose-400',
  };

  const headerBgClass = typeColor[primaryType] ?? 'bg-green-600';

  const formatText = (value) => (
    value
      ?.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );

  const imageUrl =
    data?.sprites?.other?.['official-artwork']?.front_default ||
    data?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`;

  const abilities = data?.abilities?.map((a) => formatText(a?.ability?.name)).filter(Boolean) ?? [];
  const height = data?.height != null ? `${(data.height / 10).toFixed(1)} m` : '-';
  const weight = data?.weight != null ? `${(data.weight / 10).toFixed(1)} kg` : '-';

  const getRegion = (pokemonId) => {
    if (pokemonId <= 151) return 'Kanto';
    if (pokemonId <= 251) return 'Johto';
    if (pokemonId <= 386) return 'Hoenn';
    if (pokemonId <= 493) return 'Sinnoh';
    if (pokemonId <= 649) return 'Unova';
    if (pokemonId <= 721) return 'Kalos';
    if (pokemonId <= 809) return 'Alola';
    if (pokemonId <= 905) return 'Galar';
    if (pokemonId <= 1025) return 'Paldea';
    return '-';
  };

  const region = getRegion(data?.id);

  const allStats = [
    { label: 'HP', value: hp, max: 255, color: 'bg-red-400' },
    { label: 'ATK', value: atk, max: 190, color: 'bg-orange-400' },
    { label: 'DEF', value: def, max: 230, color: 'bg-blue-400' },
    { label: 'SP.ATK', value: spAtk, max: 194, color: 'bg-violet-400' },
    { label: 'SP.DEF', value: spDef, max: 230, color: 'bg-green-400' },
    { label: 'SPD', value: spd, max: 180, color: 'bg-cyan-400' },
  ];

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-3xl overflow-hidden shadow-lg text-gray-800">

      <div className={`flex justify-center items-center pb-16 pt-8 ${headerBgClass}`}>
        <img
          className="w-36 h-36 object-cover rounded-full bg-white shadow-2xl"
          src={imageUrl}
          alt={data?.name || 'pokemon'}
        />
      </div>

      <div className="-mt-12 px-6 pb-6">

        <div className="flex justify-between items-center mt-14">
          <span className="font-bold text-gray-500">{`#${data?.id ?? '-'}`}</span>
          <span className="flex gap-2">
            {types.map((typeName) => (
              <span
                key={typeName}
                className={`inline-block px-3 py-1 ${typeColor[typeName] ?? 'bg-green-600'} text-white text-sm rounded-sm`}
              >
                {formatText(typeName)}
              </span>
            ))}
          </span>
        </div>

        <h2 className="text-center py-4 text-3xl font-bold">{formatText(data?.name) || '-'}</h2>

        <div className="flex rounded-xl bg-teal-100 px-2 py-4 justify-center w-full mb-4">
          <span className="flex flex-1 flex-col items-center">
            <span className="text-red-800 font-bold">HP</span>
            <span>{hp}</span>
          </span>
          <span className="flex flex-1 flex-col items-center">
            <span className="text-red-800 font-bold">ATK</span>
            <span>{atk}</span>
          </span>
          <span className="flex flex-1 flex-col items-center">
            <span className="text-blue-600 font-bold">DEF</span>
            <span>{def}</span>
          </span>
        </div>

        <div className="flex rounded-xl bg-gray-100 px-2 py-4 justify-center w-full mb-4">
          <span className="flex flex-1 flex-col items-center">
            <span className="text-gray-500 font-bold">Altura</span>
            <span>{height}</span>
          </span>
          <span className="flex flex-1 flex-col items-center">
            <span className="text-gray-500 font-bold">Peso</span>
            <span>{weight}</span>
          </span>
          <span className="flex flex-1 flex-col items-center">
            <span className="text-gray-500 font-bold">Región</span>
            <span>{region}</span>
          </span>
        </div>

        <div className="flex rounded-xl bg-gray-100 px-2 py-4 justify-center w-full mb-4">
          {abilities.map((ab) => (
            <span key={ab} className="flex flex-1 flex-col items-center">
              <span className="text-gray-500 font-bold">Hab.</span>
              <span>{ab}</span>
            </span>
          ))}
        </div>

        <div className="flex flex-col rounded-xl bg-gray-100 px-4 py-4 w-full mb-4">
          {allStats.map(({ label, value, max, color }) => (
            <span key={label} className="flex justify-between items-center py-1">
              <span className="text-gray-500 font-bold w-16">{label}</span>
              <span className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: value !== '-' ? `${Math.round((value / max) * 100)}%` : '0%' }}
                />
              </span>
              <span>{value}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;