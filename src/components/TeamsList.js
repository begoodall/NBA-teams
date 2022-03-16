import TableFooter from './TableFooter';
import Table from "react-bootstrap/Table";
import Team from "./Team";
import Caret from './Caret';

export default function TeamsList({ teams, citySortAlphabetical, page, handleTeamClick, handleCitySort, handlePagination, disablePages }) {
  return (
    <section>
      <Table borderless hover>
        <thead className='nba-table-header'>
          <tr>
            <th>Team Name</th>
            <th onClick={() => handleCitySort()} style={{cursor: 'pointer'}}>
              City
              <Caret alphabeticalSort={citySortAlphabetical}/>
            </th>
            <th>Abbreviation</th>
            <th>Conference</th>
            <th>Division</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => {
            return (
            <Team
              key={team.id}
              team={team}
              handleTeamClick={handleTeamClick}
            />)}
          )}
        </tbody>
      </Table>
      <TableFooter
        page={page}
        range={[1, 2, 3, 4, 5]}
        handlePagination={handlePagination}
        disablePages={disablePages}
      />
    </section>
  );
}