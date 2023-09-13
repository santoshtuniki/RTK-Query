// component imports
import {
	useGetPokemonQuery,
	useGetPokemonByNameQuery,
} from './services/pokemonSlice';

// css imports
import './App.css';

function App() {
	const {
		data,
		error,
		isLoading,
		isFetching,
		isSuccess,
	} = useGetPokemonQuery();

	return (
		<div className="App">
			{/* Loading */}
			{isLoading && <h2>Loading...</h2>}

			{/* Fetching */}
			{isFetching && <h2>Fetching...</h2>}

			{/* Error */}
			{error && <h2>Something went wrong</h2>}

			{/* Success */}
			{isSuccess && data?.results?.map((pokemon, index) => {
				return (
					<div className='table-element' key={index}>
						<h3>
							{
								pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1).toLowerCase()
							}
						</h3>
						<table>
							<PokemonDetails name={pokemon?.name} />
						</table>
					</div>
				)
			})}
		</div >
	);
}

export const PokemonDetails = ({ name }: { name: string }) => {
	const { data } = useGetPokemonByNameQuery(name);
	return (
		<tbody>
			<tr>
				<td><img src={data?.sprites?.front_shiny} alt={data?.species?.name} /></td>
				<td><img src={data?.sprites?.front_default} alt={data?.species?.name} /></td>
				<td>
					{
						data?.types?.map((item, index) => (
							<span key={index}>
								{item.type.name}
							</span>
						))
					}
				</td>
			</tr>
		</tbody>
	)
}

export default App;
