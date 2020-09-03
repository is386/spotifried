import React from "react";
import "../App.css";
import { Image } from "react-bootstrap";

class SongTable extends React.Component {
  constructor(props) {
    super(props);
    this.generateTable = this.generateTable.bind(this);
  }

  // Generates the table based on the list of song objects
  generateTable() {
    let counter = 0;
    return this.props.songs.map((song) => {
      const { id, name, album, artists, art, song_url, album_url } = song;
      counter += 1;
      if (counter%2==0){
        return (
          <tr key={id} class="rowcolor1">
            <td>
              <Image src={art} alt="album art" width="100" height="100" rounded />
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
      } else {
        return (
          <tr key={id} class="rowcolor2">
          <td>
            <Image src={art} alt="album art" width="100" height="100" rounded />
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
      }
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
