import React from 'react';
import { useSelector } from 'react-redux';

import StrainConstructionProject from '../StrainConstructionProject';
import ProteinDesignProject from '../ProteinDesignProject';
import BasicProject from '../BasicProject'

export default function Project(props) {
  const session = useSelector(state => state.session);

  const getProject = type => {
    switch (type) {
      case 'Strain Construction':
        return <StrainConstructionProject />;
      case 'Protein Design':
        return <ProteinDesignProject />;
      case 'Web App':
        return <BasicProject />
    }
  };
  return <div>{getProject(session.currentProject.type)}</div>;
}
