const React = require('react');
const { useState } = require('react');
const styled = require('styled-components');
const { SidebarCreateButtons } = require('./sidebar-create-buttons');
const { SidebarDataList } = require('./sidebar-data-list');
const { SidebarSearch } = require('./sidebar-search');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 50px);
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  margin-top: 8px;
`;

const SidebarContent = ({ contentType, data, folders }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <ButtonContainer>
        <SidebarCreateButtons
          contentType={contentType}
          hasData={data.length > 0}
        />
      </ButtonContainer>
      <SearchContainer>
        <SidebarSearch
          contentType={contentType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </SearchContainer>
      <SidebarDataList
        contentType={contentType}
        data={filteredData}
        folders={folders}
      />
    </Container>
  );
};

module.exports = { SidebarContent };
