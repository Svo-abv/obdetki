import { InputType, Field, Scalar } from "@nestjs/graphql";
import { Exclude } from "class-transformer";
import { Upload } from "src/utils/types/Upload.scalar";

@InputType()
export class ProductImageUploadInput {
    @Field({ nullable: true })
    @Exclude()
    file: Upload
}