import I18N from "./I18N";

export const baseValidate = (json: any, options: any) => {
  let errors = []

  errors = (errors || []).map((error) => {
    switch (error.keyword) {
      case "enum": {
        return {
          ...error,
          message: I18N.template(I18N.jsonschema_form.utils.notInEnums, {
            val1: error.schema?.enum,
          }),
        };
      }

      // 正则校验
      case "pattern": {
        return {
          ...error,
          message: I18N.template(I18N.jsonschema_form.utils.patternNotMatched, {
            val1: error.schema?.pattern,
          }),
        };
      }
    }

    return error;
  });

  return errors
    .map((error) => {
      if (error.keyword === "required") {
        const errorKeys = error?.ext || [];
        return errorKeys.map((key: string) => {
          return {
            ...error,
            dataPath: error.dataPath ? error.dataPath + "." + key : key,
            message: I18N.base.context.required,
          };
        });
      }

      return [error];
    })
    .reduce((pre, curr) => pre.concat(curr), []);
};
