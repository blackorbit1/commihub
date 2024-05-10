import * as React from 'react';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ExpandIcon(props) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(props) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

const renderTreeItems = (elements, validatedElements) => {
  return elements.map((element) => {
    const children = elements.filter((el) => el.parentsId.includes(element.id));
    const isValidated = validatedElements.includes(element.id);

    return (
      <CustomTreeItem
        key={element.id}
        itemId={element.id.toString()}
        label={`${isValidated ? '✓ ' : ''}${element.name}`}
        endIcon={children.length === 0 ? <EndIcon /> : null}
      >
        {children.length > 0 && renderTreeItems(children, validatedElements)}
      </CustomTreeItem>
    );
  });
};

export default function BorderedTreeView({ elements = [], validatedElements = [] }) {
  return (
    <SimpleTreeView
      aria-label='commission-elements'
      defaultExpandedItems={['1']}
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
        endIcon: EndIcon,
      }}
      sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 300 }}
    >
      {renderTreeItems(elements, validatedElements)}
    </SimpleTreeView>
  );
}
