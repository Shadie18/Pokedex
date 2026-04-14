export const About = () => {
    return (
        <section className="w-full">

            <div className="bg-white px-4 py-16 text-center">
                <h1 className="text-4xl font-extrabold text-indigo-700 tracking-wide mb-3">PokéDex <span className="text-indigo-300 font-normal text-2xl">202601</span></h1>
                <p className="text-black-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    Enciclopedia Pokémon en línea.
                    Una aplicación web que consume la PokéAPI para mostrar información detallada de cada Pokémon de forma rápida y accesible,
                    desde estadísticas de combate hasta habilidades especiales.
                </p>
            </div>

            <div className="bg-white px-4 py-10">
                <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: 'Búsqueda rápida', desc: 'Más de 1000 Pokémon al instante.' },
                        { title: 'Fichas detalladas', desc: 'Estadísticas, tipos y habilidades.' },
                        { title: 'Catálogo completo', desc: 'Todas las generaciones.' },
                        { title: 'Diseño responsivo', desc: 'Móvil, tablet y escritorio.' },
                    ].map(({ title, desc }) => (
                        <div key={title} className="flex flex-col items-center rounded-xl bg-gray-100 p-5 text-center">
                            <span className="text-indigo-700  font-bold mb-1">{title}</span>
                            <span className="text-sm text-black-600">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About;