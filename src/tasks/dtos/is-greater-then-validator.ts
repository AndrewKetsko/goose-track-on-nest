import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsGreaterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsGreaterThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          function toMinute(time: string) {
            const arrTime = time.split(':');
            return Number(arrTime[0]) * 60 + Number(arrTime[1]);
          }
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            toMinute(value) >= toMinute(relatedValue)
          );
        },
      },
    });
  };
}
