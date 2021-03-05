import React, {Fragment, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {compose} from "redux";
import {connect} from "react-redux";
import {fetchDog} from "../redux/imgdog-reducer";
import {withRouter} from "react-router";
import {articlesReducer, createApiArticle} from "../redux/reducer/completereducer";
import {getArticleFormState} from "../redux/images-selectors";
import {fetchListRequested} from "../sagas/articles";


function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const ArticleSelect = ({dispatch, list, props}) => {
  const classes = useStyles();

  // const [suggestedList, setSuggestedList] = useState([]);
  // const [selectedUser, setSelectedUser] = useState({});
  // const searchList = (value) => {
  //   if (value) {
  //     let matchedUsers = list.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
  //     setSuggestedUsers(matchedUsers);
  //   } else
  //     setSuggestedUsers([]);
  // };
  //
  // const selectUser = (user) => {
  //   setSelectedUser(user);
  // };

  useEffect(() => {
    dispatch(fetchListRequested());
  }, []);

  return (
    <>
      <Autocomplete
        id="country-select-demo"
        style={{ width: 300 }}
        options={list}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option.avatar}
        renderOption={(option) => (
          <Fragment>
            <span>{countryToFlag(option.avatar)}</span>
            {option.name} ({option.avatar}) {option.author.avatar} {option.author.firstName} {option.author.lastName}
          </Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{position:"absolute", top: '50%', width: '350px'}}
            label="Choose a article"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-article',
            }}
          />
        )}
      />
      <div>
        {console.log(list)}
      </div>
    </>
  );
};


let mapStateToProps = (state) => ({
  list: state.list.list,
  loading: state.list.loading,
  error: state.list.error
});


export default compose(
  connect(mapStateToProps),
  withRouter
)(ArticleSelect);


// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
];
