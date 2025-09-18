<?php

namespace App\Models;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Intervention\Image\Laravel\Facades\Image;
// use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Config as Config;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

use stdClass;

class Helper extends Model{


public function ImageUpload($file, $id, $type, $other_id = null)
    {
        if (!$file) {
            return "";
        }
        ini_set('memory_limit', '-1');

        // $additional_path = self::DevelopmentStatus();
        $destinationPath = "";

        switch ($type) {
            case "blog_post":
                $destinationPath = Config::get('Constants.BLOG_POST_IMAGE_PATH');
                break;
        }

        $destinationPath .= $id . '/';



        $filename = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();

        $file->move($destinationPath, $filename);

        $sizes = [
            Config::get('Constants.LARGE') => 800,
            Config::get('Constants.MEDIUM') => 500,
            Config::get('Constants.SMALL') => 300,
            Config::get('Constants.THUMB') => 300
        ];

        if (!File::exists($destinationPath . Config::get('Constants.LARGE'))) {
            foreach ($sizes as $folder => $width) {
                File::makeDirectory($destinationPath . $folder, 0775);
            }
        }

        $destinationPathFile = $destinationPath . $filename;
        // Log::debug('Destination Path File: ' . $destinationPathFile);

        /* foreach ($sizes as $folder => $width) {
            $img = Image::make(file_get_contents($destinationPathFile))->resize($width, null, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($destinationPath . $folder . $filename, 90);
        } */

       foreach ($sizes as $folder => $width) {
            $img = Image::read($destinationPathFile)
                ->resize($width, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
            $img->save($destinationPath . $folder . $filename, 90);
        }


        if ($id == 0) {
            $root_url = Request::root();
            return $root_url . '/' . $destinationPathFile;
        }

        return $filename;
    }

}

 ?>
