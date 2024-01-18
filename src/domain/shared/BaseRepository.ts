export default abstract class BaseRepository<FetchParam, FetchReturn> {
    abstract fetch(param: FetchParam): Promise<FetchReturn>
}