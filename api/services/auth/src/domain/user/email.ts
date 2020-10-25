import { Either, left, right } from "../../shared/logic/either";
import { ValueObject } from "../../shared/domain/value-object";

interface EmailData {
  value: string;
}

export class Email extends ValueObject<EmailData> {
  private static readonly EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  private constructor(data: EmailData) {
    super(data);
  }

  public getValue(): string {
    return this.data.value;
  }

  public static create(value: string): Either<Error, Email> {
    try {
      Email.validateEmail(value);

      return right(new Email({ value }));
    } catch (err) {
      return left(err);
    }
  }

  private static validateEmail(email: string): void | never {
    if (!email) {
      throw new Error("Email must not be empty");
    }

    if (!Email.EMAIL_REGEX.test(email)) {
      throw new Error("Email has an invalid format, e.g example@test.com");
    }
  }
}

const eitherEmail = Email.create("");

if (eitherEmail.isRight()) {
  const error = eitherEmail.value;
} else {
  const error = eitherEmail.value;
}
