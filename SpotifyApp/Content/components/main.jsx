export default class TopBox extends React.Component {
    state = {
        topData: this.props.initialData,
    };
    render() {
        return (
            <table class="pure-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Popularity</th>
                    </tr>
                </thead>
                {this.state.topData.map((element) => (
                    <tr>
                        <td>
                            <img
                                width="100px"
                                height="100px"
                                src={element.album.images[0].url}
                            ></img>
                        </td>
                        <td>{element.name}</td>
                        <td>{element.popularity}</td>
                    </tr>
                ))}
            </table>
        );
    }
}
