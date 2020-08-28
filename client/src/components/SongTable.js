import React from "react";
import "../App.css";

class SongTable extends React.Component {
  constructor(props) {
    super(props);
    this.generateTable = this.generateTable.bind(this);
  }

  // Generates the table based on the list of song objects
  generateTable() {
    return this.props.songs.map((song) => {
      const { id, name, album, artists, art, song_url, album_url } = song;
      return (
        <tr key={id}>
          <td>
            <img src={art} alt="album art" width="100" height="100" />
          </td>
          <td>
            <a href={song_url}>{name}</a>
          </td>
          <td>
            <a href={album_url}>{album}</a>
          </td>
          <td>{artists.join(", ")}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table id="top-ten-songs">
        <thead>
          <tr>
            <th>Cover Art</th>
            <th>Track</th>
            <th>Album</th>
            <th>Artist(s)</th>
          </tr>
        </thead>
        <tbody>{this.generateTable()}</tbody>
      </table>
    );
  }
}

export default SongTable;
