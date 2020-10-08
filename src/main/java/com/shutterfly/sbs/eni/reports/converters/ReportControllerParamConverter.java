package com.shutterfly.sbs.eni.reports.converters;

import com.shutterfly.sbs.eni.reports.repositories.model.ReportNames;
import org.springframework.core.convert.converter.Converter;

public class ReportControllerParamConverter implements Converter<String, ReportNames> {

    @Override
    public ReportNames convert(String source) {
      return ReportNames.valueOf(source.toUpperCase());
    }

}
