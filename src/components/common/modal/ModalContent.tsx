import React from "react";
import RecipeForm from "../Recipe/RecipeForm";

interface ModalContentProps {
  filter: string | null;
}

interface FilterComponents {
  [key: string]: JSX.Element;
}

const filterComponents: FilterComponents = {
  RecipeAdd: <RecipeForm></RecipeForm>,
  default: <div>Default Component</div>,
};

const ModalContent: React.FC<ModalContentProps & { onSave?: () => void }> = ({
  filter,
  onSave,
}) =>
  filter && filter in filterComponents
    ? React.cloneElement(filterComponents[filter], { onSave })
    : filterComponents.default;

export default ModalContent;
